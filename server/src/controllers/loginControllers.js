import "dotenv/config";
import {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
} from "../service/mongooseService.js";

const cookieOptions = {
  httpOnly: true,
  maxAge: 3600, // Час життя cookie в секундах (1 година)
  path: "/", // Cookie буде доступне у всьому додатку
  sameSite: "strict", // Захист від CSRF атак
};

if (process.env.NODE_ENV === "production") {
  cookieOptions.secure = true; // Використовується HTTPS в продакшні
}

export const getAllUserHandler = async function (req, reply) {
  try {
    const user = await findAll();
    console.log("====================================");
    console.log(user);
    console.log("====================================");
    reply.status(200).send(user);
  } catch (error) {
    reply.status(404).send(error);
  }
};
export const getUserHandler = async function (req, reply) {
  try {
    const params = req.params.id;
    const user = await findOne(params);
    console.log("====================================");
    console.log(user);
    console.log("====================================");
    reply.status(200).send(user);
  } catch (error) {
    reply.status(404).send(error);
  }
};

export const addUserHandler = async function (req, reply) {
  try {
    const newUser = req.body;
    const addUser = await createOne(newUser);
    reply.status(201).send(addUser);
  } catch (error) {
    if (error.status === 11000) {
      reply.status(400).send(`${error.message}, email mast be unique`);
    }

    reply.status(404).send(error);
  }
};

export const patchUserHandler = async function (req, reply) {
  try {
    const patch = await updateOne(req.params.id, req.body);
    reply.status(200).send(patch);
  } catch (error) {
    reply.status(404).send(error);
  }
};

export const deleteUserHandler = async function (req, reply) {
  try {
    const deleteUser = await deleteOne({ _id: req.params.id });
    if (!deleteUser) {
      reply.status(404).send(`User with id ${req.params.id} is not existed`);
    }
    reply.status(200).send(deleteUser);
  } catch (error) {
    reply.status(400).send(error.message);
  }
  y;
};

export const loginHandler = async function (req, reply) {
  try {
    const user = await findOne({ email: req.body.email }).select("-__v");
    console.log("====================================");
    console.log("login", user);
    console.log("====================================");

    if (!user) {
      return reply.status(401).send("invalid login or password");
    }

    const isValid = await user.isValidPassword(req.body.password);

    if (!isValid) {
      return reply.status(401).send("invalid login or password");
    }

    const token = req.server.jwt.sign({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });

    return reply
      .status(201)
      .setCookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 3600, // 1 година
        path: "/",
      })
      .send(user);
  } catch (error) {
    return reply.status(400).send(error.message);
  }
};
export const logoutHandler = async function (req, reply) {
  console.log("====================================");
  console.log("logout");
  console.log("====================================");
  reply
    .clearCookie("token", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .send("Logged out successfully");
};

export const registrationHandler = async function (req, reply) {
  try {
    const newUser = await createOne(req.body);
    console.log("====================================");
    console.log(newUser);
    console.log("====================================");
    const token = req.server.jwt.sign({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
    reply
      .status(201)
      .setCookie("token", token, {
        httpOnly: true,
        maxAge: 3600, // Час життя cookie в секундах (1 година)
        path: "/", // Cookie буде доступне у всьому додатку
        sameSite: "strict", // Захист від CSRF атак
      })
      .send(newUser);
  } catch (error) {
    if (error.code === 11000) {
      reply.status(400).send(`${error.message}, email mast be unique`);
    }
    reply.status(404).send(error.message);
  }
};

export const refreshHandler = async function (req, reply) {
  try {
    const user = await req.jwtVerify();
    reply.status(200).send(user);
  } catch (err) {
    reply.code(401).send({ error: "Unauthorized" });
  }
};
