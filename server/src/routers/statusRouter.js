import { getStatus } from "../controllers/statusController.js";

export default async function statusRouter(fastify, opt) {
  fastify.route({
    method: "get",
    url: "/getAllStatus",
    onRequest: [fastify.authenticate],
    // schema: login,
    attachValidation: true,
    handler: getStatus,
  });
}
