import mongoose from "mongoose";
export const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`database connected ${conn.connection.host}`);
  } catch (error) {
    console.log("Error while connecting to db ");
    console.log(error);
  }
};
