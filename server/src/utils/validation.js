import { z } from "zod";

export function validateBody(schema) {
  return async (request, reply) => {
    try {
      request.validatedBody = await schema.parseAsync(request.body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Validation failed",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      throw error;
    }
  };
}

export function validateParams(schema) {
  return async (request, reply) => {
    try {
      request.validatedParams = await schema.parseAsync(request.params);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Invalid parameters",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      throw error;
    }
  };
}

export function validateQuery(schema) {
  return async (request, reply) => {
    try {
      request.validatedQuery = await schema.parseAsync(request.query);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Invalid query parameters",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      throw error;
    }
  };
}
