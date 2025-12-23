import "dotenv/config";
import {
  createOne,
  findAll,
  findOneByUniqueField,
} from "../service/prismaARM.js";
import fastify from "fastify";

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

    reply.status(200).send(user);
  } catch (error) {
    reply.status(404).send(error);
  }
};
export const getUserHandler = async function (req, reply) {
  try {
    const params = req.params.id;
    const user = await findOneByUniqueField(params);
    reply.status(200).send(user);
  } catch (error) {
    reply.status(404).send(error);
  }
};

export const addUserHandler = async function (req, reply) {
  try {
    const newUser = req.body;
    console.log(req.body);

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
    console.log("====================================");
    console.log(req.body.email);
    console.log("====================================");
    const user = await req.server.prisma.user.findUnique({
      where: { email: req.body.email },
    });
    console.log("====================================");
    console.log("login", user);
    console.log("====================================");

    if (!user) {
      return reply.status(401).send("invalid login or password");
    }

    const isValid = await user.comparePassword(req.body.password);

    if (!isValid) {
      return reply.status(401).send("invalid login or password");
    }

    const token = req.server.jwt.sign({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      department: user.department,
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
    const newUser = req.validatedBody;

    // ✅ Перевірка чи користувач вже існує
    const existingUser = await req.server.prisma.user.findUnique({
      where: { email: newUser.email },
    });

    if (existingUser) {
      return reply.code(409).send({
        statusCode: 409,
        error: "Conflict",
        message: "Email already registered",
      });
    }

    // ✅ Хешуємо пароль
    const hashedPassword = await req.server.hash.password(newUser.password);

    // ✅ Створюємо користувача
    const user = await req.server.prisma.user.create({
      data: {
        ...newUser,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        role: true,
        department: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
      },
    });

    // ✅ Логування (видалити в продакшені)
    req.server.log.info({ userId: user.id }, "New user registered");

    // ✅ Генеруємо JWT токен (тільки необхідні дані)
    const token = req.server.jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: "7d", // Опціонально: термін дії токена
      }
    );

    // ✅ Встановлюємо cookie і відправляємо відповідь
    return reply
      .code(201)
      .setCookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 7 * 24 * 60 * 60, // 7 днів (в секундах)
        path: "/",
      })
      .send({
        statusCode: 201,
        message: "User registered successfully",
        user,
      });
  } catch (error) {
    // ✅ Обробка Prisma помилки унікальності
    if (error.code === "P2002") {
      return reply.code(409).send({
        statusCode: 409,
        error: "Conflict",
        message: "Email already exists",
      });
    }

    // ✅ Логування помилки
    req.server.log.error(
      {
        error: error.message,
        stack: error.stack,
      },
      "Registration error"
    );

    // ✅ Загальна помилка
    return reply.code(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: "Registration failed",
    });
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
