import express from "express";
import { createMachine, getMachine } from "../controller/machine";
import { utilityRouter } from "./utility";
import { taskRouter } from "./task";

export const machineRouter = express.Router();
machineRouter.use("/:m_id/utilities/", utilityRouter);
machineRouter.use("/:m_id/tasks/", taskRouter);

machineRouter.post("/create/", createMachine);
machineRouter.get("/:m_id", getMachine);
