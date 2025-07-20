import fastify from "./scr/service.js";

import "dotenv/config";

// server fastify
const server = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000 });
    fastify.log.info(`server start at port ${fastify.server.address().port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

server();
