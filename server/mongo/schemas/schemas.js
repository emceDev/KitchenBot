import { mongo, mongoose } from "mongoose";

const contentsSchema = mongoose.Schema({
  name: { type: "String", default: "name" },
  type: { type: "String", default: "type" },
});
const optionSchema = mongoose.Schema({
  name: String,
  values: Array,
  set: { type: Number, required: true, default: 0 },
});
const utilitySchema = mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, default: "in use" },
  position: { type: String, required: true },
  options: [optionSchema],
  jobType: { type: String, required: true },
  contents: contentsSchema,
});

const jobSchema = mongoose.Schema({
  type: String,
  status: { type: String, default: "Created" },
  time: Number,
  source: utilitySchema,
  destination: utilitySchema,
});
const taskSchema = mongoose.Schema({
  name: String,
  status: { type: String, default: "Created" },
  jobs: [jobSchema],
});
const machineSchema = mongoose.Schema({
  name: String,
  password: String,
  tasks: [taskSchema],
  utilities: [utilitySchema],
});
export const Machine = mongoose.model("Machine", machineSchema);
