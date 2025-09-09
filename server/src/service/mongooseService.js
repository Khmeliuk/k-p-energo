import User from "../models/user.js";
import Task from "../models/task.js";

export const findAll = () => {
  console.log("====================================");
  console.log("findAll");
  console.log("====================================");
  return User.find();
};

export const findAllTask = () => {
  console.log("====================================");
  console.log("findAllTask");
  console.log("====================================");
  return Task.find();
};

export const findAllTaskYourTask = (id) => {
  console.log("====================================");
  console.log("id", id);
  console.log("====================================");
  return Task.find({ owner: id }).populate({
    path: "owner",
    select: "-password",
  });
};

export const findAllTaskDepartmentTask = (department) => {
  console.log("====================================");
  console.log("department", department);
  console.log("====================================");
  return Task.find({ department: department });
};

export const findOne = (params) => {
  return User.findOne(params).select({
    __v: false,
  });
};

export const findOneTask = (params) => {
  return Task.findOne(params).select({
    __v: false,
  });
};

export const createOne = async (newUser) => {
  return await User.create(newUser);
};

export const createOnTask = async (newUser) => {
  return await Task.create(newUser);
};

export const createOneTask = async (newUser) => {
  return await Task.create(newUser);
};

export const updateOne = (id, data) => {
  return User.findOneAndUpdate({ _id: id }, data);
};

export const updateOneTask = ({ id }, data, opt) => {
  return Task.findOneAndUpdate({ _id: id }, data, opt);
};

export const deleteOne = (id) => {
  return User.findOneAndDelete({ _id: id });
};

export const deleteOneTask = ({ id, owner }) => {
  console.log("====================================");
  console.log(id, owner);
  console.log("====================================");
  return Task.findOneAndDelete({ _id: id, owner: owner });
};
