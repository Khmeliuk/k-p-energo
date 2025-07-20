import fp from "fastify-plugin";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.Promise = global.Promise;

async function mongoosePlugin(fastify) {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      autoIndex: true,
      ssl: true,
    });

    fastify.log.info("✅ MongoDB connected");
    fastify.decorate("mongoose", mongoose);
  } catch (err) {
    fastify.log.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}

export default fp(mongoosePlugin);
