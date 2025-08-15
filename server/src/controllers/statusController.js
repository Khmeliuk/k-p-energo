import mongoose from "mongoose";
import Task from "../models/task.js";

export const getAllStatus = async (req, reply) => {
  try {
    const stats = await Task.aggregate([
      {
        $match: {
          owner: { $in: userIds },
          department: { $in: departmentIds },
        },
      },
      {
        $group: {
          _id: { owner: "$owner", status: "$status" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.owner",
          statuses: {
            $push: { status: "$_id.status", count: "$count" },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          ownerId: "$_id",
          ownerName: "$userInfo.name",
          completed: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$statuses",
                      cond: { $eq: ["$$this.status", "виконано"] },
                    },
                  },
                  0,
                ],
              },
              { count: 0 },
            ],
          },
          inProgress: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$statuses",
                      cond: { $eq: ["$$this.status", "виконуються"] },
                    },
                  },
                  0,
                ],
              },
              { count: 0 },
            ],
          },
          notCompleted: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$statuses",
                      cond: { $eq: ["$$this.status", "невиконано"] },
                    },
                  },
                  0,
                ],
              },
              { count: 0 },
            ],
          },
        },
      },
    ]);

    // Підсумковий формат
    const formatted = stats.map((u) => ({
      ownerId: u.ownerId,
      ownerName: u.ownerName,
      completed: u.completed.count,
      inProgress: u.inProgress.count,
      notCompleted: u.notCompleted.count,
    }));
    console.log("====================================");
    console.log(formatted, "asdasdasdasdasd");
    console.log("====================================");
    return formatted;
  } catch (error) {
    console.error(error);
  }
};

export const getStatus = async (req, reply) => {
  const userID = new mongoose.Types.ObjectId(req.user._id);

  const stats = await Task.aggregate([
    { $match: { owner: userID } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // Усі можливі статуси
  const allStatuses = ["виконано", "виконуються", "невиконано"];
  console.log("====================================");
  console.log(stats);
  console.log("====================================");
  return allStatuses.reduce((acc, status) => {
    acc[status] = stats.find((s) => s._id === status)?.count || 0;
    return acc;
  }, {});
};
