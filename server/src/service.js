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

const fastify = Fastify({ logger: true });

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

//Handles request to urls that do not exist on our route
fastify.get("/notfound", async (request, reply) => {
  reply.callNotFound();
});

// Підключення плагіна CORS
fastify.register(fastifyCors, {
  origin: [
    "http://localhost:5173", // для розробки
    "https://k-p-energy.netlify.app", // фронтенд в продакшені
  ],
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"], // Методи, які дозволені
  allowedHeaders: ["Content-Type", "Authorization"], // Заголовки, які дозволені
  credentials: true, // Дозволити передачу credentials, таких як куки
});

// decorators
fastify.register(decoratorsPlugin);

// custom routers
fastify.register(
  async function apiRoutes(fastify) {
    fastify.register(authorization, { prefix: "/auth" });
    fastify.register(userRouter, { prefix: "/user" });
    fastify.register(taskRouter, { prefix: "/task" });
  },
  { prefix: "/api/v1" }
);

//This route gets called if an error occurs within the app and throws an error
fastify.get("/error", async (request, reply) => {
  throw new Error("kaboom");
});

//This handles any error that gets thrown within the application
fastify.setErrorHandler(async (err, request, reply) => {
  if (err.validation) {
    reply.code(403);
    return err.message;
  }
  request.log.error({ err });
  reply.code(err.statusCode || 500);

  return "I'm sorry, there was an error processing your request.";
});

//This handles the logic when a request is made to a route that does not exist
fastify.setNotFoundHandler(async (request, reply) => {
  reply.code(404);
  return "I'm sorry, I couldn't find what you were looking for.";
});

export default fastify;
