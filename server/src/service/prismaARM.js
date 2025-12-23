import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async () => {
  console.log("====================================");
  console.log("findAll");
  console.log("====================================");
  return await prisma.user.findMany();
};

export const findAllTask = async () => {
  console.log("====================================");
  console.log("findAllTask");
  console.log("====================================");
  return await prisma.task.findMany();
};

export const findAllTaskYourTask = async (id) => {
  console.log("====================================");
  console.log("id", id);
  console.log("====================================");
  return await prisma.user.findUnique({
    where: { owner: id },
    include: { task: true },
  });
};
export const findAllTaskDepartmentTask = async (department) => {
  console.log("====================================");
  console.log("department", department);
  console.log("====================================");
  return await prisma.task.findMany({
    where: { department },
  });
};
// Find one by unique fields: id or email
export const findOneByUniqueField = async ({ id, email }) => {
  if (!id && !email) {
    throw new Error("findOne requires id or email");
  }

  if (id && email) {
    throw new Error("findOne accepts only one unique field");
  }

  return prisma.user.findUnique({
    where: id ? { id } : { email },
  });
};

export const findOneTask = async (params) => {
  return await prisma.task.findUnique({
    where: params,
  });
};

export const createOne = async (newUser) => {
  console.log("====================================");
  console.log("createOne  ");
  console.log("====================================");
  return await prisma.user.create({
    data: newUser,
  });
};
