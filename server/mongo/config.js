import { mongoose } from "mongoose";

const uri = "mongodb://127.0.0.1:27017/Robots";

export const client = async () => {
  try {
    console.log("connecting");
    const connection = await mongoose.connect(uri);
    // console.log('Connection data:',connection);
    return connection;
  } catch (error) {
    console.log(uri);
    console.log("error with connection", error);
  }
};
