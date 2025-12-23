import fp from "fastify-plugin";

export default fp(async function dbKeepAlivePlugin(fastify, opts) {
  const interval = opts.interval || 5 * 60 * 1000; // default 5 хвилин

  // Пінг функція
  async function pingDB() {
    try {
      await fastify.prisma.$queryRaw`SELECT 1`;
      fastify.log.info("DB keep-alive ping successful");
    } catch (err) {
      fastify.log.error("DB ping error:", err);
    }
  }

  // Запуск інтервалу
  const timer = setInterval(pingDB, interval);

  // Пінганути одразу після старту
  pingDB();

  // Очищаємо інтервал при зупинці сервера
  fastify.addHook("onClose", async () => {
    clearInterval(timer);
    await prisma.$disconnect();
  });
});
