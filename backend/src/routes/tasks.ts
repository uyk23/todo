import express, { Request, Response } from "express";
import Task from "../models/task";
import { TaskType } from "../shared/types";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  [
    body("title", "title is required").notEmpty(),
    body("detail").optional({ nullable: true }),
    body("categories", "categories is required").notEmpty().isArray(),
    body("dueDate").optional({ nullable: true }),
    body("tags").optional({ nullable: true }).isArray(),
  ],
  async (req: Request, res: Response) => {
    try {
      const newTask: TaskType = req.body;
      newTask.userId = req.userId;
      const task = new Task(newTask);
      await task.save();
      return res.status(201).send(task);
    } catch (error) {
      console.log("error creating task: ", error);
      return res.status(500).json({ message: "something went wrong" });
    }
  }
);

router.get("/:page", verifyToken, async (req: Request, res: Response) => {
  const page =
    req.params.page === "all"
      ? ["today", "tomorrow", "this week"]
      : [req.params.page];

  try {
    const tasks = await Task.find({
      userId: req.userId,
      categories: { $in: page },
    });
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "error fetching tasks" });
  }
});

// router.get("/:id", verifyToken, async (req: Request, res: Response) => {
//   const id = req.params.id.toString();

//   try {
//     const task = await Task.findOne({
//       _id: id,
//       userId: req.userId,
//     });
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ message: "error fetching tasks" });
//   }
// });

export default router;
