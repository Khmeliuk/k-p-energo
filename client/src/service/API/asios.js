import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
// const BASE_URL = "https://k-p-energo.onrender.com/api/v1";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
export const getAllTask = async () => {
  try {
    return await axiosInstance.get("/task");
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (formData) => {
  try {
    const user = await axiosInstance.post("/auth/login", formData);
    console.log("====================================");
    console.log(user, "axios");
    console.log("====================================");
    return user;
  } catch (error) {
    if (error.response && error.response.data?.message) {
      console.log("====================================");
      console.log(error.response.data.message);
      console.log("====================================");
      throw new Error(error.response.data.message);
    }
    throw new Error("Login failed. Please try again.");
  }
};

export const registration = async (formData) => {
  try {
    return await axiosInstance.post("/auth/registration", formData);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTasks = async () => {
  try {
    console.log("====================================");
    console.log("getTasks");
    console.log("====================================");
    const data = await axiosInstance.get("task");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createTask = async (task) => {
  try {
    return await axiosInstance.post("task", task);
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

export const logout = async () => {
  try {
    return await axiosInstance.post("/auth/logout");
  } catch (error) {
    console.error("logoutError", error);
  }
};

export const refresh = async () => {
  try {
    const response = await axiosInstance.get("/auth/check", {
      withCredentials: true,
    });
    console.log("====================================");
    console.log(response.data, "refresh");
    console.log("====================================");
    return response.data;
  } catch (error) {
    console.error("Refresh error:", error);
    throw error; // або поверни null / false, якщо не хочеш кидати
  }
};
