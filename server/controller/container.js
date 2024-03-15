import asyncHandler from "express-async-handler";
import { Machine } from "../mongo/schemas/schemas";

const container = [
  {
    type: "container",
    contents: { type: "container", name: "contentname", weight: 0 },
    number: "P00",
  },
];
export const createContainers = asyncHandler(async (req, res) => {
  console.log("Creating an container...", req.body, req.params);
  try {
    const parentMachine = await Machine.findById(req.params.m_id);
    console.log("here");
    console.log(...req.body);
    // const baseValues = container;
    // console.log(baseValues);
    const newContainer = req.body.map((container) => container);
    parentMachine.registeredContainers = newContainer;
    // later on chec of aviable machine types (predefined ones)
    // req.body.type === "mixer";

    console.log(newContainer);
    await parentMachine.save();
    console.log(newContainer);
    res.json(newContainer);
  } catch (err) {
    console.log(err);
    res.json("utility saving process failed:", err);
    throw Error({ "utility saving process failed:": err });
  }
});
export const registerSingleContainer = asyncHandler(async (req, res) => {
  console.log(
    "REGISTERSINGLE CONTAINER: got data from client...",
    req.body,
    req.params
  );
  try {
    const parentMachine = await Machine.findById(req.params.m_id);
    console.log("registeringSingleContainer");
    parentMachine.registeredContainers.push(req.body);
    const newContainer = await parentMachine.save();
    res.json(newContainer);
  } catch (err) {
    console.log(err);
    res.json("single container saving process failed:", err);
    throw Error({ "single container saving process failed:": err });
  }
});
export const getRegisteredContainers = asyncHandler(async (req, res) => {
  console.log("loading the containers list...", req.params);
  try {
    Machine.findById(req.params.m_id)
      .select("registeredContainers")
      .then((containers) => res.json(containers));
    // res.json("uillist");
    console.log("response sent:");
  } catch (err) {
    res.json(err);
    throw Error({ "loading registed containeres process failedss:": err });
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
