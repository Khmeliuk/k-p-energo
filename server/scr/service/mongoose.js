import "dotenv/config";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const mongooseConnect = function (fastify, { loglevel: info }, next) {
  try {
    mongoose.connect(process.env.local_BD, {
      config: {
        autoIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
    });
    next();
  } catch (error) {
    console.error(error);
  }
};
export default mongooseConnect;
