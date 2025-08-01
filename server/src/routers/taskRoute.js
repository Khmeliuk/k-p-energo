import {
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  addTask,
} from "../schema/taskSchema.js";
import {
  getAllTaskHandler,
  getTaskHandler,
  addTaskHandler,
  patchTaskHandler,
  deleteTaskHandler,
} from "../controllers/taskController.js";

export default async function taskRouter(fastify, opt) {
  fastify.route({
    method: "GET",
    url: "/",
    onRequest: [fastify.authenticate],
    // schema: getAllTasks,
    attachValidation: "error attachValidation",
    handler: getAllTaskHandler,
  });

  fastify.route({
    method: "GET",
    url: "/:query",
    onRequest: [fastify.authenticate],
    schema: getTask,
    attachValidation: "true",
    handler: getTaskHandler,
  });

  fastify.route({
    method: "post",
    url: "/",
    onRequest: [fastify.authenticate],
    // schema: addTask,
    attachValidation: "true",
    handler: addTaskHandler,
  });

  fastify.route({
    method: "patch",
    url: "/",
    onRequest: [fastify.authenticate],
    schema: updateTask,
    attachValidation: "true",
    handler: patchTaskHandler,
  });

  fastify.route({
    method: "delete",
    url: "/:id",
    onRequest: [fastify.authenticate],
    schema: deleteTask,
    attachValidation: "true",
    handler: deleteTaskHandler,
  });
}
