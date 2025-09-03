import { login, logout, registration } from "../schema/userSchema.js";
import {
  loginHandler,
  logoutHandler,
  registrationHandler,
  refreshHandler,
} from "../controllers/loginControllers.js";

export default async function authorization(fastify, opt) {
  fastify.route({
    method: "post",
    url: "/login",
    // schema: login,
    attachValidation: true,
    handler: loginHandler,
  }),
    fastify.route({
      method: "post",
      url: "/logout",
      // schema: logout,
      attachValidation: true,
      handler: logoutHandler,
    }),
    fastify.route({
      method: "post",
      url: "/registration",
      schema: registration,
      attachValidation: true,
      handler: registrationHandler,
    });

  fastify.route({
    method: "get",
    url: "/check",
    onRequest: [fastify.authenticate],
    //  schema: refreshHandler,
    attachValidation: true,
    handler: refreshHandler,
  });
}
