import { schemaUnification } from "./schemaUnification.js";

export const getAllTasks = {
  querystring: schemaUnification.querystring,
  headers: schemaUnification.headers,
  response: { "2xx": { type: "array", items: schemaUnification.taskSchema } },
};

export const getTask = {
  querystring: schemaUnification.querystring,
  headers: schemaUnification.headers,
  response: { "2xx": schemaUnification.taskSchema },
};

export const addTask = {
  querystring: schemaUnification.querystring,
  headers: schemaUnification.headers,
  body: schemaUnification.taskSchema,
  response: { "2xx": schemaUnification.taskSchema },
};

export const updateTask = {
  querystring: schemaUnification.querystring,
  headers: schemaUnification.headers,
  body: schemaUnification.taskSchema,
  response: { "2xx": schemaUnification.taskSchema },
};

export const deleteTask = {
  querystring: schemaUnification.querystring,
  headers: schemaUnification.headers,
  param: { type: "string" },
  response: { "2xx": schemaUnification.taskSchema },
};
