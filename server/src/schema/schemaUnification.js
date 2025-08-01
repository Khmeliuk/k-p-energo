export const schemaUnification = {
  taskSchema: {
    type: "object",
    properties: {
      _id: { type: "string" },
      owner: { type: "object" },
      department: { type: "number" },
      address: { type: "string" },
      date: { type: "string" },
      task: { type: "array" },
      status: { type: "string" },
      update: {
        type: "array",
      },
      description: { type: "string" },
    },
  },

  headers: {
    type: "object",
    properties: {},
  },

  tokenHeader: {},

  bodyLogin: {
    additionalProperties: false,
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
  },

  bodyReq: {
    additionalProperties: false,
    type: "object",
    required: ["name", "email", "password", "lastName"],
    properties: {
      name: {
        type: "string",
      },
      lastName: { type: "string" },
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
      role: { type: "string" },
    },
  },
  querystring: { name: { type: "string" }, excitement: { type: "integer" } },
  responseAll: {
    "2xx": {
      type: "array",
      items: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string" },
          role: { type: "string" },
        },
      },
    },
  },
  response: {
    "2XX": {
      type: "object",
      properties: {
        _id: { type: "string" },
        name: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string" },
        role: { type: "string" },
      },
    },
  },
};
