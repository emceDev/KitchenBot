import asyncHandler from "express-async-handler";
import { Machine } from "../mongo/schemas/schemas";

const mixer = {
  jobType: "mix",
  type: "mixer",
  options: [{ name: "speed", values: ["1", "2", "3", "4"] }],
};
const container = {
  jobType: "add",
  type: "container",
  contents: { type: "not assigned", name: "empty" },
  options: [{ name: "open via:", values: ["valve", "gate"] }],
};
const stove = {
  jobType: "stove",
  type: "stove",
  options: [{ name: "power", values: ["1", "2", "3"] }],
};
export const createUtility = asyncHandler(async (req, res) => {
  console.log("Creating an utility...", req.body, req.params);
  try {
    const parentMachine = await Machine.findById(req.params.m_id);
    // console.log(parentMachine);
    const baseValues =
      req.body.type === "mixer"
        ? mixer
        : req.body.type === "container"
        ? container
        : req.body.type === "stove" && stove;
    console.log(baseValues);
    const newUtility = parentMachine.utilities.push({
      ...req.body,
      ...baseValues,
    });
    // later on chec of aviable machine types (predefined ones)
    req.body.type === "mixer";

    console.log(newUtility);
    await parentMachine.save();
    console.log(newUtility);
    res.json(newUtility);
  } catch (err) {
    console.log(err);
    res.json("utility saving process failed:", err);
    throw Error({ "utility saving process failed:": err });
  }
});
export const getUtilityList = asyncHandler(async (req, res) => {
  console.log("loading the utlity list...", req.params);
  try {
    Machine.findById(req.params.m_id)
      .select("utilities")
      .then((utilities) => res.json(utilities));
    // res.json("uillist");
    console.log("loaded utils");
  } catch (err) {
    res.json(err);
    throw Error({ "loading utils process failedss:": err });
  }
});
export const editUtility = asyncHandler(async (req, res) => {
  console.log("editing an utility...", req.body, req.params);
  try {
    const parentMachine = await Machine.findById(req.params.m_id);
    const utility = parentMachine.utilities.id(req.params.u_id);

    for (const [key, value] of Object.entries(req.body)) {
      value ? (utility[key] = value) : null;
    }
    parentMachine.save();

    const updatedUtility = parentMachine.utilities.id(req.params.u_id);
    res.json(updatedUtility);
  } catch (err) {
    console.log(err);
    res.json(err);
    throw Error({ "utility saving process failed:": err });
  }
});
