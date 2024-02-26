import express from "express";

import {
  getManualSteerData,
  setManualSteerData,
} from "../controller/manualSteer.js";

export const manualSteerRouter = express.Router();

manualSteerRouter.get("/", (req, res) => {
  console.log("get");
  res.send(`'Hit success tw', ${req.url}`);
});
manualSteerRouter.post("/", setManualSteerData);
// manualSteerRouter.get("/manualSteer", (req,res)=>{
//     console.log('hit success')
//     res.send(`'Hit success', ${req.url}`)
// });
//manualSteerRouter.post("/", setManualSteerData);
