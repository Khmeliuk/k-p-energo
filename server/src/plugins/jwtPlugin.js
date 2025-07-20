import fastifyPlugin from "fastify-plugin";
import fastifyJWT from "@fastify/jwt";
import "dotenv/config";

async function jwt(fastify, opt) {
  fastify.register(fastifyJWT, {
    secret: process.env.SECRET_CODE,
    cookie: {
      cookieName: "token",
      signed: false,
    },
    decoratorName: "user",
  });
}
export default fastifyPlugin(jwt);
