import fastifyPlugin from "fastify-plugin";

async function prismaKeepAlive(fastify, opts) {
  // Раз у 5 хв виконуємо простий запит
  const interval = opts.interval || 5 * 60 * 1000; // default 5 хвилин
  setInterval(async () => {
    try {
      await fastify.prisma.$queryRaw`SELECT 1`;
      fastify.log.info("Prisma keep-alive ping");
    } catch (err) {
      fastify.log.error("Prisma keep-alive failed", err);
    }
  }, interval);
}

export default fastifyPlugin(prismaKeepAlive);
