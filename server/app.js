import fastify from "./scr/service.js";

import "dotenv/config";

// server fastify
const server = async () => {
  try {
    const address = await fastify.listen({
      port: process.env.PORT || 3000,
      host: "0.0.0.0",
    });
    fastify.log.info(`Server started at ${address}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

server();
