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

  // fastify.decorate(
  //   "patchValidation",
  //   function removeDisallowedFields(request, disallowedFields) {
  //     const update = request.body;
  //     if (request.user.role === "super user") {
  //       return "your super user";
  //     }
  //     disallowedFields.forEach((field) => {
  //       if (update.hasOwnProperty(field)) {
  //         delete update[field];
  //       }
  //       if (update.$set && update.$set.hasOwnProperty(field)) {
  //         delete update.$set[field];
  //       }
  //       return update;
  //     });
  //   }
  // );
  fastify.decorate(
    "patchValidation",
    function filterAllowedFields(request, allowedFields) {
      const update = request.body;

      // Супер користувач може оновлювати все
      if (request.user.role === "super user") {
        return update;
      }

      // Створюємо новий об'єкт тільки з дозволеними полями
      const filteredUpdate = {};

      // Фільтруємо основні поля
      allowedFields.forEach((field) => {
        if (update.hasOwnProperty(field)) {
          filteredUpdate[field] = update[field];
        }
      });

      // Фільтруємо поля в $set (для MongoDB операцій)
      if (update.$set) {
        const filteredSet = {};
        allowedFields.forEach((field) => {
          if (update.$set.hasOwnProperty(field)) {
            filteredSet[field] = update.$set[field];
          }
        });

        // Додаємо $set тільки якщо є дозволені поля
        if (Object.keys(filteredSet).length > 0) {
          filteredUpdate.$set = filteredSet;
        }
      }

      // Копіюємо інші MongoDB операції якщо вони є
      ["$unset", "$push", "$pull", "$addToSet", "$inc"].forEach((operation) => {
        if (update[operation]) {
          filteredUpdate[operation] = update[operation];
        }
      });

      // Оновлюємо request.body відфільтрованими даними
      request.body = filteredUpdate;

      return filteredUpdate;
    }
  );
}

export default fastifyPlugin(decoratorsPlugin);
