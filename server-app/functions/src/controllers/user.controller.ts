/* eslint-disable linebreak-style */
import {db} from "../config/firebaseConfig.js";
import {Request, Response} from "express";
const userCollection = "usuarios";

const get = (req: Request, res: Response) => {
  (async () => {
    try {
      const userQuerySnapshot = await db.collection(userCollection).get();
      const users:any = [];
      userQuerySnapshot.forEach((doc: any)=>{
        users.push({
          id: doc.id,
          data: doc.data()});
      });
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
};

const getById = (req: Request, res: Response) => {
  const userId = req.params.userId;

  (async () => {
    try {
      const result = await db.collection(userCollection).doc(userId).get();
      const user = result.data();
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
};

const post = (req: Request, res: Response) => {
  const data = req.body;
  (async () => {
    try {
      await db.collection(userCollection).add(data);
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
};

const update = (req: Request, res: Response) => {
  const userId = req.params.userId;
  const data = req.body;

  (async () => {
    try {
      await db.collection(userCollection).doc(userId).set(data, {merge: true});
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
};

const deleteUser = (req: Request, res: Response) => {
  const userId = req.params.userId;

  (async () => {
    try {
      await db.collection(userCollection).doc(userId).delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
};

const userController = {
  "get": get,
  "getById": getById,
  "post": post,
  "update": update,
  "deleteUser": deleteUser};

export {userController};
