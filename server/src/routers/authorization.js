import {
  loginHandler,
  logoutHandler,
  registrationHandler,
  refreshHandler,
} from "../controllers/loginControllers.js";
import { createUserInputSchema, loginSchema } from "../schema/user.schema.js";
import { validateBody } from "../utils/validation.js";

export default async function authorization(fastify, opt) {
  fastify.route({
    method: "post",
    url: "/login",
    attachValidation: true,
    preHandler: validateBody(loginSchema),
    handler: loginHandler,
  }),
    fastify.route({
      method: "post",
      url: "/logout",
      attachValidation: true,
      handler: logoutHandler,
    }),
    fastify.route({
      method: "post",
      url: "/registration",
      preHandler: validateBody(createUserInputSchema),
      attachValidation: true,
      handler: registrationHandler,
    });

  fastify.route({
    method: "get",
    url: "/check",
    onRequest: [fastify.authenticate],
    attachValidation: true,
    handler: refreshHandler,
  });
}
