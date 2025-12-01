import fastifyPlugin from "fastify-plugin";

/**
 * Додає декоратор `authenticate` до Fastify.
 * @param {FastifyInstance} fastify - Інстанс Fastify.
 * @param {Object} options - Опції плагіна.
 */

async function authenticatePlugin(fastify, opt) {
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send(err.message);
    }
  });
}

export default fastifyPlugin(authenticatePlugin);
