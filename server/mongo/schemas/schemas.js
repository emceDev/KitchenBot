import { mongo, mongoose } from "mongoose";

// const contentsSchema = mongoose.Schema({
//   name: { type: "String", default: "name" },
//   type: { type: "String", default: "type" },
// });
// const optionSchema = mongoose.Schema({
//   name: String,
//   values: Array,
//   set: { type: Number, required: true, default: 0 },
// });
// const utilitySchema = mongoose.Schema({
//   type: { type: String, required: true },
//   name: { type: String, required: true },
//   status: { type: String, default: "free" },
//   position: { type: String, required: true },
//   options: [optionSchema],
//   jobType: { type: String, required: true },
//   contents: contentsSchema,
// });

// const jobSchema = mongoose.Schema({
//   type: String,
//   status: { type: String, default: "Created" },
//   time: Number,
//   source: utilitySchema,
//   destination: utilitySchema,
// });
const containerSchema = mongoose.Schema({
  number: String,
  type: { type: String, default: "container" },
  contents: {
    contentsType: String,
    name: String,
    weight: Number,
  },
});

const toolSchema = mongoose.Schema({
  name: String,
  type: { type: String, default: "tool" },
  jobType: String,
  options: {},
  position: Number,
  number: String,
});
const stoveSchema = mongoose.Schema({
  name: String,
  type: { type: String, default: "stove" },
  options: {},
  position: Number,
  isIgnited: Boolean,
  ignitionTimes: [Number],
  isOccupied: Boolean,
  number: String,
});
const jobSchema = mongoose.Schema({
  jobType: String,
  container: containerSchema,
  tool: toolSchema,
  stove: stoveSchema,
  options: {},
});

const receipeSchema = mongoose.Schema({
  name: String,
  status: String,
  jobs: [jobSchema],
  stoves: [stoveSchema],
  containers: [containerSchema],
});
const machineSchema = mongoose.Schema({
  name: String,
  password: String,
  number: String,
  receipes: [receipeSchema],
  registeredContainers: [containerSchema],
  tools: [toolSchema],
});
export const Machine = mongoose.model("Machine", machineSchema);
