import mongoose from "mongoose";
import {
  getAllUserHandler,
  getUserHandler,
  addUserHandler,
  deleteUserHandler,
  patchUserHandler,
} from "../controllers/loginControllers.js";

export default async function userRouters(fastify, opt) {
  fastify.route({
    method: "GET",
    url: "/",
    // schema: getAllUsers,
    attachValidation: "error attachValidation",
    handler: getAllUserHandler,
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    // schema: getUser,
    attachValidation: "error attachValidation",
    handler: getUserHandler,
  });

  fastify.route({
    method: "post",
    url: "/",
    // schema: addUser,
    attachValidation: "error attachValidation",
    handler: addUserHandler,
  });

  fastify.route({
    method: "delete",
    url: "/:id",
    // schema: deleteUser,
    attachValidation: "error attachValidation",
    handler: deleteUserHandler,
  });

  fastify.route({
    method: "patch",
    url: "/:id",
    // schema: updateUser,
    attachValidation: "error attachValidation",
    handler: patchUserHandler,
  });
}
