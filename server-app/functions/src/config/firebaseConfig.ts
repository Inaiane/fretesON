/* eslint-disable linebreak-style */
import * as admin from "firebase-admin";
import {ServiceAccount} from "firebase-admin";
import * as permissions from "./permissions.json";

const serviceAccount = permissions as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://freteson-98009.firebaseio.com"});

const db = admin.firestore();

export {db};
