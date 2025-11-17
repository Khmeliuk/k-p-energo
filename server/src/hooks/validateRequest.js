export async function validateRequest(schema, data) {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    throw {
      statusCode: 400,
      message: "Validation error",
      errors: error.errors,
    };
  }
}
