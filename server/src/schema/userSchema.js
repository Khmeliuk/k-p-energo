import { schemaUnification } from "./schemaUnification.js";

export const getAllUsers = {
  querystring: schemaUnification.querystring,
  headers: schemaUnification.headers,
  response: schemaUnification.responseAll,
};

export const getUser = {
  querystring: schemaUnification.querystring,
  headers: schemaUnification.headers,
  params: {
    type: "string",
  },
  response: schemaUnification.response,
};

export const registration = {
  querystring: schemaUnification.querystring,
  removeAdditional: "all",
  headers: {},
  body: schemaUnification.bodyReq,
  response: schemaUnification.response,
};

export const addUser = {
  querystring: schemaUnification.querystring,
  removeAdditional: "all",
  headers: schemaUnification.headers,
  body: schemaUnification.bodyReq,
  response: schemaUnification.response,
};

export const login = {
  querystring: schemaUnification.querystring,
  removeAdditional: "all",
  headers: {},
  body: schemaUnification.bodyLogin,
  response: schemaUnification.response,
};

export const logout = {
  querystring: schemaUnification.querystring,
  removeAdditional: "all",
  required: ["token"],
  headers: schemaUnification.headers,

  response: {
    200: {
      type: "string",
    },
  },
};

export const deleteUser = {
  querystring: schemaUnification.querystring,
  params: { type: "string" },
  removeAdditional: "all",
  headers: schemaUnification.headers,
  response: schemaUnification.response,
};

export const updateUser = {
  querystring: schemaUnification.querystring,
  params: { type: "string" },
  removeAdditional: "all",
  headers: schemaUnification.headers,
  body: {
    ...schemaUnification.bodyReq,
    required: [],
  },
  response: schemaUnification.response,
};
