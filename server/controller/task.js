import asyncHandler from "express-async-handler";
import { Machine } from "../mongo/schemas/schemas";
const dummy_machine = {
  id: "664ecd9b500c295bc7d36e271",
};

export const createTask = asyncHandler(async (req, res) => {
  console.log("Creating an Task...", req.body);
  try {
    const parentMachine = await Machine.findById(req.params.m_id);
    console.log(parentMachine.tasks);
    delete req.body._id;
    const newTask = parentMachine.tasks.push(req.body);
    console.log(newTask);
    await parentMachine.save();
    console.log(newTask);
    res.json(newTask);
  } catch (err) {
    console.log(err);
    res.json("Task saving process failed:", err);
    throw Error({ "Task saving process failed:": err });
  }
});
export const getTaskList = asyncHandler(async (req, res) => {
  console.log("loading the tasks list...", req.params);
  try {
    Machine.findById(req.params.m_id)
      .select("tasks")
      .then((tasks) => res.json(tasks));
    console.log("loaded tasks");
  } catch (err) {
    res.json(err);
    throw Error({ "loading tasks process failedss:": err });
  }
});
export const getTask = asyncHandler(async (req, res) => {
  console.log("loading the tasks list...", req.params);
  try {
    const parentMachine = await Machine.findById(req.params.m_id);
    const task = parentMachine.tasks.id(req.params.t_id);
    res.json(task);
    console.log("loaded tasks");
  } catch (err) {
    res.json(err);
    throw Error({ "loading tasks process failedss:": err });
  }
});
export const editTask = asyncHandler(async (req, res) => {
  console.log("editing an Task...", req.body, req.params);
  try {
    const parentMachine = await Machine.findById(req.params.m_id);
    const task = parentMachine.tasks.id(req.params.t_id);

    for (const [key, value] of Object.entries(req.body)) {
      value ? (task[key] = value) : null;
    }
    parentMachine.save();

    const updatedTask = parentMachine.tasks.id(req.params.t_id);
    res.json(updatedTask);
  } catch (err) {
    // console.log(err);
    res.json(err);
    throw Error({ "task saving process failed:": err });
  }
});
