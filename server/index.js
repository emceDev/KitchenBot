import "dotenv/config";
import express from "express";
import cors from "cors";
import { manualSteerRouter } from "./routes/manualSteer.js";
import { client } from "./mongo/config.js";
import { machineRouter } from "./routes/machine.js";

const app = express();
const port = 4001;

app.use(cors());
app.use(express.json());

app.use("/manualSteer", manualSteerRouter);
app.use("/machine", machineRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("*", (req, res) => {
  console.log("hit this: ", req.method, req.url);
  res.send(`'HIT those random!', ${req.url}`);
});

client();
