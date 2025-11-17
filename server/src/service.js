import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import mongooseConnect from "./service/mongoose.js";
import jwt from "./plugins/jwtPlugin.js";
import userRouter from "./routers/userRouter.js";
import authorization from "./routers/authorization.js";
import taskRouter from "./routers/taskRoute.js";
import decoratorsPlugin from "./decorators/decorators.js";
import fastifyMultipart from "@fastify/multipart";
import fastifyCors from "@fastify/cors";
import "dotenv/config";
import statusRouter from "./routers/statusRouter.js";
import prismaPlugin from "./plugins/prismaPlugin.js";

const isProd = process.env.NODE_ENV === "production";

const fastify = Fastify({
  logger: isProd
    ? { level: "info" } // чистий JSON для продакшну
    : {
        level: "debug",
        transport: {
          target: "pino-pretty",
          options: { colorize: true, translateTime: "SYS:standard" },
        },
      },
});

fastify.register(fastifyMultipart, {
  addToBody: true, // Додаємо поля з formData до request.body
  attachFieldsToBody: true, // Додаємо поля з formData до body як звичайні об'єкти
  throwFileError: true, // Кидаємо помилку, якщо знайдено файл
});

// register JWT plugin and cookey
fastify.register(jwt);
fastify.register(fastifyCookie);

// mongoose
fastify.register(mongooseConnect);

//prisma plugin

fastify.register(prismaPlugin);

//Handles request to urls that do not exist on our route
fastify.get("/notfound", async (request, reply) => {
  reply.callNotFound();
});

// Підключення плагіна CORS
fastify.register(fastifyCors, {
  origin: (origin, cb) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://k-p-energy.netlify.app",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true); // ✅ дозволено
    } else {
      cb(new Error("Not allowed"), false); // ❌ заборонено
    }
  },
  credentials: true,
});

// decorators
fastify.register(decoratorsPlugin);

// custom routers
fastify.register(
  async function apiRoutes(fastify) {
    fastify.register(authorization, { prefix: "/auth" });
    fastify.register(userRouter, { prefix: "/user" });
    fastify.register(taskRouter, { prefix: "/task" });
    fastify.register(statusRouter, { prefix: "/status" });
  },
  { prefix: "/api/v1" }
);

//This route gets called if an error occurs within the app and throws an error
fastify.get("/error", async (request, reply) => {
  throw new Error("kaboom");
});

//This handles any error that gets thrown within the application
// Оновлений Error Handler для роботи з Zod валідацією
fastify.setErrorHandler(async (err, request, reply) => {
  // Обробка помилок валідації Zod
  if (err.statusCode === 400 && err.errors) {
    request.log.warn({
      validation: err.message,
      errors: err.errors,
    });

    return reply.code(400).send({
      error: err.message,
      details: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Обробка помилок Fastify валідації (якщо використовуєте)
  if (err.validation) {
    request.log.warn({ validation: err.message });
    return reply.code(400).send({
      error: "Validation error",
      message: err.message,
    });
  }

  // Обробка помилок Prisma (унікальність, foreign key тощо)
  if (err.code === "P2002") {
    request.log.warn({ prisma: err.message });
    return reply.code(409).send({
      error: "Conflict",
      message: `${err.meta?.target?.[0] || "Field"} already exists`,
    });
  }

  if (err.code === "P2025") {
    request.log.warn({ prisma: err.message });
    return reply.code(404).send({
      error: "Not found",
      message: "Resource not found",
    });
  }

  // Обробка інших помилок Prisma
  if (err.code?.startsWith("P")) {
    request.log.error({ prisma: err });
    return reply.code(500).send({
      error: "Database error",
      message: "I'm sorry, there was an error processing your request.",
    });
  }

  // Обробка неправильних запитів (404, 405 тощо)
  if (err.statusCode === 404) {
    return reply.code(404).send({
      error: "Not found",
      message: "The requested resource was not found",
    });
  }

  // Обробка помилок автентифікації (якщо використовуєте)
  if (err.statusCode === 401 || err.statusCode === 403) {
    request.log.warn({ auth: err.message });
    return reply.code(err.statusCode).send({
      error: "Unauthorized",
      message: err.message,
    });
  }

  // Обробка всіх інших помилок
  request.log.error({
    error: err.message,
    statusCode: err.statusCode,
    url: request.url,
  });

  return reply.code(err.statusCode || 500).send({
    error: "Server error",
    message: "I'm sorry, there was an error processing your request.",
  });
});

//This handles the logic when a request is made to a route that does not exist
fastify.setNotFoundHandler(async (request, reply) => {
  reply.code(404);
  return "I'm sorry, I couldn't find what you were looking for.";
});

export default fastify;
