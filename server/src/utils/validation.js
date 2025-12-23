import { z } from "zod";

const SOURCES = {
  body: { field: "validatedBody", message: "Validation failed" },
  params: { field: "validatedParams", message: "Invalid parameters" },
  query: { field: "validatedQuery", message: "Invalid query parameters" },
};

function validate(schema, source) {
  const { field, message } = SOURCES[source];

  return async (request, reply) => {
    try {
      request[field] = schema.parse(request[source]);
    } catch (error) {
      // ✅ Перевіряємо чи це ZodError і чи є errors масивом
      if (error instanceof z.ZodError && Array.isArray(error.errors)) {
        request.log?.warn({
          type: "validation_error",
          source,
          errors: error.errors,
        });

        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message,
          details: error.errors.map((err) => ({
            field: err.path.join(".") || source,
            message: err.message,
            code: err.code,
          })),
        });
      }

      // ✅ Якщо error має інший формат
      if (error.name === "ZodError" && error.issues) {
        request.log?.warn({
          type: "validation_error_issues",
          source,
          issues: error.issues,
        });

        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message,
          details: error.issues.map((err) => ({
            field: err.path.join(".") || source,
            message: err.message,
            code: err.code,
          })),
        });
      }

      // ✅ Для інших помилок
      request.log?.error({
        type: "unexpected_error",
        source,
        error: error.message,
        stack: error.stack,
      });

      throw error;
    }
  };
}

export const validateBody = (schema) => validate(schema, "body");
export const validateParams = (schema) => validate(schema, "params");
export const validateQuery = (schema) => validate(schema, "query");
