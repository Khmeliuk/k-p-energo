import { PrismaClient } from "@prisma/client";
import fastifyPlugin from "fastify-plugin";

async function prismaPlugin(fastify, options) {
  const prisma = new PrismaClient();

  fastify.decorate("prisma", prisma);

  fastify.addHook("onReady", async () => {
    console.log("Database connected");
  });

  fastify.addHook("onClose", async (instance, done) => {
    await prisma.$disconnect();
    done();
  });
}

export default fastifyPlugin(prismaPlugin);
