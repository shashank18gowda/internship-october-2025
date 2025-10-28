import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    //   .connect("mongodb://127.0.0.1:27017/test") //for compass
    .connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME }) //for atlas

    .then(() => console.log("Connected!"))
    .catch((err) => console.log("Err while connecting DB", err));
};

export default connectDB;
