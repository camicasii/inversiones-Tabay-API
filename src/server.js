import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import morgan from "morgan";
import typeDefs from "./schema2";
import resolvers from "./resolve";
import "./database/database";
import router from "./router";
import path from "path";
import multer from "multer";
const uuid = require('uuid/v4')
const app = express();
app.set("port", process.env.PORT || 4001);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "/uploads")),
  filename: (req, file, cb) =>
    cb(null, uuid()+path.extname(file.originalname))
});
var upload = multer({ storage }).single("upload");
//Middlewere
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/", upload, router);
const server = new ApolloServer({ typeDefs, resolvers, context: req => {} });
server.applyMiddleware({ app, cors: true });
app.listen(app.get("port"), () =>
  console.log("server on port", app.get("port"))
);