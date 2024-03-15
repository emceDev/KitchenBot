import asyncHandler from "express-async-handler";
import { Machine } from "../mongo/schemas/schemas";
const dummyMachine = {
  name: "FirstMachine",
  password: "pass",
  tasks: [],
  utilities: [],
};

export const createMachine = asyncHandler(async (req, res) => {
  console.log("Creating the machine...");
  const machine = new Machine(req.body);
  try {
    machine.save().then((savedDoc) => res.json(savedDoc));
    console.log("saved machine");
  } catch (err) {
    res.json("machine saving process failed:");
    throw Error({ "machine saving process failed:": err });
  }
  return machine;
});
export const getMachine = asyncHandler(async (req, res) => {
  console.log("loading the machine...", req.params);
  try {
    Machine.findById(req.params.m_id).then((machine) => res.json(machine));
    //res.json('machine')
    console.log("loaded machine");
  } catch (err) {
    // console.log(err);
    res.json("machine saving process failed:");
    throw Error({ "machine saving process failed:": err });
  }
});
