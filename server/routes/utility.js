import express from "express";
import {
  createUtility,
  editUtility,
  getUtilityList,
} from "../controller/utility";

export const utilityRouter = express.Router({ mergeParams: true });

utilityRouter.get("/", (req, res) => {
  console.log("get util");
  res.send(`'Hit success on util', ${req.url}`);
});

utilityRouter.get("/list", getUtilityList);

utilityRouter.post("/create/", createUtility);
utilityRouter.post("/edit/:u_id", editUtility);
// machineRouter.post("/edit/", createMachine);
