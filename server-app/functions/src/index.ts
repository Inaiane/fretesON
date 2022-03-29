import express from "express";
import cors from "cors";
import apiRoute from "./routes/index.js";
import * as functions from "firebase-functions";
import * as bodyParser from "body-parser";

const main = express();

main.use(cors({origin: true}));
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

main.use("/", apiRoute);

export const api = functions.https.onRequest(main);
