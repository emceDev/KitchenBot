import express from "express";

import {
  createContainers,
  getRegisteredContainers,
  registerSingleContainer,
} from "../controller/container";

export const containerRouter = express.Router({ mergeParams: true });

// containerRouter.get("/", (req, res) => {
//   console.log("get util");
//   res.send(`'Hit success on util', ${req.url}`);
// });

containerRouter.get("/get", getRegisteredContainers);
containerRouter.post("/registerOne/", registerSingleContainer);
containerRouter.post("/register/", createContainers);
// containerRouter.post("/edit/:u_id", editUtility);
// machineRouter.post("/edit/", createMachine);
