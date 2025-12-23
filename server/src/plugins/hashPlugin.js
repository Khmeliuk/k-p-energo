import fp from "fastify-plugin";
import bcrypt from "bcrypt";

/**
 * Плагін для роботи з bcrypt хешуванням паролів
 */
async function hashPlugin(fastify, options) {
  const saltRounds = options.saltRounds || 10;

  const hashPassword = async (password) => {
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (error) {
      fastify.log.error("Error hashing password:", error);
      throw new Error("Password hashing failed");
    }
  };

  const comparePassword = async (password, hash) => {
    try {
      const isMatch = await bcrypt.compare(password, hash);
      return isMatch;
    } catch (error) {
      fastify.log.error("Error comparing password:", error);
      throw new Error("Password comparison failed");
    }
  };

  // Декоруємо fastify з методами хешування
  fastify.decorate("hash", {
    password: hashPassword,
    compare: comparePassword,
  });

  fastify.log.info("✅ Hash plugin registered");
}

// Експортуємо з fp щоб був доступний глобально
export default fp(hashPlugin, {
  name: "hash-plugin",
});
