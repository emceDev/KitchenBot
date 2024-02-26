import express from "express";
import { createTask, editTask, getTaskList, getTask } from "../controller/task";

export const taskRouter = express.Router({ mergeParams: true });

taskRouter.get("/", (req, res) => {
  console.log("get task");
  res.send(`'Hit success on task', ${req.url}`);
});

taskRouter.get("/list", getTaskList);

taskRouter.post("/create/", createTask);
taskRouter.get("/:t_id", getTask);
taskRouter.post("/edit/:t_id", editTask);
// machineRouter.post("/edit/", createMachine);
