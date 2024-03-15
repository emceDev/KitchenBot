import asyncHandler from "express-async-handler";
import { Machine } from "../mongo/schemas/schemas";

export const getReceipeList = asyncHandler(async (req, res) => {
  console.log("loading the receipe list...", req.params);
  try {
    const data = await Machine.findById(req.params.m_id).select("receipes");
    // .then((receipes) => res.json(receipes));
    // console.log(data);

    const arr = data.receipes.map((receipe) => {
      return { _id: receipe._id, name: receipe.name, status: receipe.status };
    });
    res.json(arr);
  } catch (err) {
    res.json(err);
    throw Error({ "loading receipes list process failed:": err });
  }
});
export const getReceipeDetails = asyncHandler(async (req, res) => {
  console.log("getReceipeDetails");
  try {
    const m_id = req.params.m_id;
    const r_id = req.params.r_id;
    const machine = await Machine.findById(m_id);
    const receipe = await machine.receipes.id(r_id);
    // console.log(receipe);'
    console.log("is receipe frozen on server?", Object.isFrozen(receipe));
    res.json(receipe);
  } catch (error) {
    res.json(error);
    throw Error({ "task saving process failed:": error });
  }
});
export const receipeUpdate = asyncHandler(async (req, res) => {
  console.log("hit on receipe edit");
  const { m_id, r_id } = req.params;
  const receipeData = req.body;
  console.log(req.params);
  try {
    const machine = await Machine.findById(m_id);
    const receipe = machine.receipes.id(r_id);

    for (const [key, value] of Object.entries(receipeData)) {
      value ? (receipe[key] = value) : null;
    }
    const response = await machine.save();
    res.json(response);

    console.log("implement unregister containers...");
  } catch (error) {
    res.json(error);
    throw Error({ "task saving process failed:": error });
  }
});
export const receipeCreate = asyncHandler(async (req, res) => {
  console.log("creating receipe");
  const m_id = req.params.m_id;
  try {
    const machine = await Machine.findById(m_id);
    machine.receipes.push(req.body);
    const response = await machine.save();
    const newReceipe = response.receipes[response.receipes.length - 1];
    res.json(newReceipe);
    console.log("saved");
    console.log("implement unregister containers...");
  } catch (error) {
    res.json(error);
    throw Error({ "task saving process failed:": error });
  }

  //   console.log
});
export const receipeConfigure = asyncHandler(async (req, res) => {
  const { m_id, r_id } = req.params;
  const receipeData = req.body;
  console.log("receipeConfigure");
  try {
    const machine = await Machine.findById(m_id);
    const receipe = machine.receipes.id(r_id);

    for (const [key, value] of Object.entries(receipeData)) {
      value ? (receipe[key] = value) : null;
    }
    receipe.status = "configured";
    const response = await machine.save();
    console.log(receipe);
    res.json(receipe);

    console.log("implement unregister containers...");
  } catch (error) {
    res.json(error);
    throw Error({ "task saving process failed:": error });
  }
});
