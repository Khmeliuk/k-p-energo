import fastifyPlugin from "fastify-plugin";

/**
 * Додає декоратор `authenticate` до Fastify.
 * @param {FastifyInstance} fastify - Інстанс Fastify.
 * @param {Object} options - Опції плагіна.
 */

async function decoratorsPlugin(fastify, opt) {
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send(err.message);
    }
  });

  fastify.decorate(
    "patchValidation",
    function removeDisallowedFields(request, disallowedFields) {
      const update = request.body;
      if (request.user.role === "super user") {
        return "your super user";
      }
      disallowedFields.forEach((field) => {
        if (update.hasOwnProperty(field)) {
          delete update[field];
        }
        if (update.$set && update.$set.hasOwnProperty(field)) {
          delete update.$set[field];
        }
        return update;
      });
    }
  );
}

export default fastifyPlugin(decoratorsPlugin);
