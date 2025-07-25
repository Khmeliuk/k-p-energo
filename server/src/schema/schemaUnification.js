export const schemaUnification = {
  taskSchema: {
    type: "object",
    properties: {
      _id: { type: "string" },
      owner: { type: "string" },
      department: { type: "number" },
      address: { type: "string" },
      date: { type: "string" },
      task: { type: "array" },
      update: {
        type: "array",
        // items: {
        //   type: "object",
        //   properties: {
        //     owner: { type: "string" },
        //     update: {
        //       type: "object",
        //       properties: {
        //         owner: { type: "string" },
        //       },
        //     },
        //   },
        // },
      },
      task: { type: "string" },
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
