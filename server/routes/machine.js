import express from "express";
import { createMachine, getMachine } from "../controller/machine";
import { utilityRouter } from "./utility";
import { taskRouter } from "./task";
import { containerRouter } from "./container";
import { receipeRouter } from "./receipe";

export const machineRouter = express.Router();
machineRouter.use("/:m_id/utilities/", utilityRouter);
machineRouter.use("/:m_id/tasks/", taskRouter);

machineRouter.post("/create/", createMachine);
machineRouter.get("/:m_id", getMachine);
machineRouter.use("/:m_id/registeredContainers/", containerRouter);

machineRouter.use("/:m_id/receipe/", receipeRouter);
