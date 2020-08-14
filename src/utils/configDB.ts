import mongoose from "mongoose";
import bluebird from "bluebird";
import dotenv from "dotenv";
dotenv.config();
export const configDB = () => {
  const { DB_HOST, DB_PORT, DB_NAME, DB_CONNECTION } = process.env;
  mongoose.Promise = bluebird;
  const URL = `${DB_CONNECTION}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  mongoose.set("useFindAndModify", false);

  return mongoose.connect(
    URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) return console.log(`Connect to mongodb error: ${err}`);
      console.log("Connect to successfully");
    }
  );
};
