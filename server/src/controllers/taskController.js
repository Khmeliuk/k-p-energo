import mongoose from "mongoose";
import {
  deleteOneTask,
  findAllTask,
  findOneTask,
  createOnTask,
  updateOneTask,
  findAllTaskYourTask,
  findAllTaskDepartmentTask,
} from "../service/mongooseService.js";

// export const getAllTaskHandler = async function (req, reply) {
//   try {
//     const userID = new mongoose.Types.ObjectId(req.user._id);

//     const tasks = await findAllTaskYourTask(req.user._id);
//     tasks.map((el) => {
//       if (el.status === "done") {
//         console.log(el, "status not change");

//         return;
//       }
//       if (Date.now() > new Date(el.dateToEndTask)) {
//         if (el.status !== "incomplete") {
//           el.status = "incomplete";
//         }

//         return;
//       }
//       if (Date.now() <= new Date(el.dateToEndTask)) {
//         el.status = "planned";

//         return;
//       }
//       if (!el.status) {
//         el.status = "no status";
//         return;
//       }
//     });
//     const statusCount = tasks.reduce((acc, task) => {
//       const status = task.status || "none"; // якщо статус відсутній
//       acc[status] = (acc[status] || 0) + 1;
//       return acc;
//     }, {});
//     reply.status(200).send({ tasks: tasks, statusCount: statusCount });
//   } catch (error) {
//     reply.status(404).send(error.message);
//   }
// };

export const getAllTaskHandler = async function (req, reply) {
  try {
    console.log("====================================");
    console.log(req.user.department, "asdasdasdasdasdasd");
    console.log("====================================");
    const tasks = await findAllTaskDepartmentTask(req.user.department);

    const now = new Date();

    // Підготовка масиву операцій для bulkWrite
    const bulkOps = tasks
      .filter((el) => el.status !== "done" && el.status !== "postpone") // не оновлюємо завершені
      .map((el) => {
        let newStatus = el.status;

        if (!el.status) newStatus = "no status";
        else if (now > new Date(el.dateToEndTask)) newStatus = "incomplete";
        else if (now <= new Date(el.dateToEndTask)) newStatus = "planned";

        el.status = newStatus; // оновлюємо локально для відповіді

        // Якщо статус змінився — робимо операцію для БД
        if (newStatus !== el.status) {
          return {
            updateOne: {
              filter: { _id: el._id, owner: req.user._id },
              update: { $set: { status: newStatus } },
            },
          };
        }
        return null;
      })
      .filter(Boolean); // видаляємо null

    if (bulkOps.length) {
      await Task.bulkWrite(bulkOps);
    }

    const statusCount = tasks.reduce((acc, task) => {
      const status = task.status || "none";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    reply.status(200).send({ tasks, statusCount });
  } catch (error) {
    reply.status(500).send(error.message);
  }
};

export const getTaskHandler = async function (req, reply) {
  try {
    const params = req.params.id;
    const task = await findOneTask(params);
    reply.status(200).send(task);
  } catch (error) {
    reply.status(404).send(error);
  }
};

export const addTaskHandler = async function (req, reply) {
  try {
    const newTask = { owner: req.user._id, status: "виконується", ...req.body };
    const addTask = await createOnTask(newTask);
    reply.status(201).send(addTask);
  } catch (error) {
    if (error.status === 11000) {
      reply.status(400).send(`${error.message}, email mast be unique`);
    }

    reply.status(404).send(error.message);
  }
};

export const patchTaskHandler = async function (req, reply) {
  try {
    if (req.user.role === "user") {
      reply.status(200).send("лісом");
    }
    const allowedField = ["owner", "_id", "update"];
    req.server.patchValidation(req, allowedField);
    const update = { owner: req.user, patch: req.body };
    const patch = await updateOneTask(
      { id: req.body.id, owner: req.user.id },
      { $set: req.body, $push: { update: update } },
      {
        new: true,
      }
    );
    console.log("====================================");
    console.log(req.body.id);
    console.log("====================================");
    if (!patch) {
      reply.status(404).send("не знайшов");
    }
    console.log(req.user);
    reply.status(200).send(patch);
  } catch (error) {
    reply.status(404).send(error.message);
  }
};

export const deleteTaskHandler = async function (req, reply) {
  try {
    console.log(req.params.id);
    const deleteTask = await deleteOneTask({
      id: req.params.id,
      owner: req.user.id,
    });
    if (!deleteTask) {
      reply.status(404).send(`Task with id ${req.params.id} is not existed`);
    }
    reply.status(200).send(deleteTask);
  } catch (error) {
    reply.status(400).send(error.message);
  }
  y;
};

export const changeStatusHandler = async function (req, reply) {
  try {
    const allowedField = ["status", "id"];
    const { id, status } = req.body;

    req.server.patchValidation(req, allowedField);

    const update = { owner: req.user, patch: req.body };

    const patch = await updateOneTask(
      { id },
      { $set: { status }, $push: { update: update } },
      {
        new: true,
      }
    );

    if (!patch) {
      return reply.code(404).send("не знайшов");
    }

    return reply.code(200).send(patch);
  } catch (error) {
    return error;
  }
};
