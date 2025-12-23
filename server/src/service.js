import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import mongooseConnect from "./service/mongoose.js";
import jwt from "./plugins/jwtPlugin.js";
import userRouter from "./routers/userRouter.js";
import authorization from "./routers/authorization.js";
import taskRouter from "./routers/taskRoute.js";
import fastifyMultipart from "@fastify/multipart";
import fastifyCors from "@fastify/cors";
import "dotenv/config";
import statusRouter from "./routers/statusRouter.js";
import prismaPlugin from "./plugins/prismaPlugin.js";
import { z } from "zod";
import authenticatePlugin from "./plugins/authenticatePlugin.js";
import dbKeepalive from "./plugins/db-keepalive.js";
import hashPlugin from "./plugins/hashPlugin.js";

const isProd = process.env.NODE_ENV === "production";

const fastify = Fastify({
  logger: isProd
    ? true
    : {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      },
});

fastify.register(fastifyMultipart, {
  addToBody: true,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB ліміт
  },
});

fastify.register(jwt);
fastify.register(fastifyCookie);
// fastify.register(mongooseConnect);
fastify.register(prismaPlugin);

//Хешування паролів
fastify.register(hashPlugin, { saltRounds: 5 });

// Налаштування CORS
fastify.register(fastifyCors, {
  origin: (origin, cb) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://k-p-energy.netlify.app",
    ];

    // Дозволяємо всі origins в dev режимі
    if (!isProd) {
      cb(null, true);
      return;
    }

    // У продакшені перевіряємо білий список
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // ✅ Явно вказуємо методи
  allowedHeaders: ["Content-Type", "Authorization"], // ✅ Дозволені заголовки
});

fastify.register(authenticatePlugin);
fastify.register(dbKeepalive, { interval: 5 * 60 * 1000 });

fastify.register(
  async function apiRoutes(fastify) {
    fastify.register(authorization, { prefix: "/auth" });
    fastify.register(userRouter, { prefix: "/user" });
    fastify.register(taskRouter, { prefix: "/task" });
    fastify.register(statusRouter, { prefix: "/status" });
  },
  { prefix: "/api/v1" }
);

fastify.setErrorHandler(async (error, request, reply) => {
  if (error instanceof z.ZodError) {
    request.log.warn({ validation: error });
    return reply.code(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: "Validation failed",
      details: error.details || error.errors || [],
    });
  }

  // Fastify validation
  if (error.validation) {
    request.log.warn({ validation: error });
    return reply.code(400).send({
      statusCode: 400,
      error: "Validation Error",
      message: error.message,
    });
  }

  // Prisma errors
  if (error.code === "P2002") {
    const field = error.meta?.target?.[0] || "Field";
    request.log.warn({ prisma: error.code });
    return reply.code(409).send({
      statusCode: 409,
      error: "Conflict",
      message: `${field} already exists`,
    });
  }

  if (error.code === "P2025") {
    request.log.warn({ prisma: error.code });
    return reply.code(404).send({
      statusCode: 404,
      error: "Not Found",
      message: "Resource not found",
    });
  }

  if (error.code?.startsWith("P")) {
    request.log.error({ prisma: error });
    return reply.code(500).send({
      statusCode: 500,
      error: "Database Error",
      message: "Database operation failed",
    });
  }

  // HTTP errors
  if (error.statusCode === 401 || error.statusCode === 403) {
    request.log.warn({ auth: error.message });
    return reply.code(error.statusCode).send({
      statusCode: error.statusCode,
      error: error.statusCode === 401 ? "Unauthorized" : "Forbidden",
      message: error.message,
    });
  }

  if (error.statusCode === 404) {
    return reply.code(404).send({
      statusCode: 404,
      error: "Not Found",
      message: "The requested resource was not found",
    });
  }

  // Generic errors
  request.log.error({
    error: error.message,
    stack: error.stack,
    statusCode: error.statusCode,
  });

  return reply.code(error.statusCode || 500).send({
    statusCode: error.statusCode || 500,
    error: "Internal Server Error",
    message: isProd
      ? "An error occurred processing your request"
      : error.message,
  });
});

fastify.setNotFoundHandler(async (request, reply) => {
  return reply.code(404).send({
    statusCode: 404,
    error: "Not Found",
    message: "Route not found",
  });
});

// Graceful shutdown
const SHUTDOWN_TIMEOUT = 10000;

async function shutdown(signal) {
  console.log(`${signal} received, shutting down gracefully...`);

  const timeout = setTimeout(() => {
    console.error("Shutdown timeout, forcing exit");
    process.exit(1);
  }, SHUTDOWN_TIMEOUT);

  try {
    await fastify.close();
    clearTimeout(timeout);
    process.exit(0);
  } catch (err) {
    console.error("Shutdown error:", err);
    clearTimeout(timeout);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

export default fastify;
