import { Request, Response } from "express";
import firebase from "../config/firebase";
import AccountResponse from "../models/response/accountResponse";

const accountCollection = firebase.collection("accounts");

export const getAllAccount = async (req: Request, res: Response) => {
  console.log(`getAllAccount start time ${new Date().toISOString()}`);

  try {
    const data = await accountCollection.get();

    const response: AccountResponse[] = [];

    data.forEach((doc) => {
      response.push({
        id: doc.id,
        name: doc.data().name,
        username: doc.data().username,
        password: doc.data().password,
        type: doc.data().type,
      });
    });

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "get all account success",
      },
      data: response,
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e,
        description: "Bad Request",
      },
      data: null,
    });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  console.log(`createAccount start time ${new Date().toISOString()}`);

  try {
    const data = req.body;

    await accountCollection.doc().set(data);

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "create account success",
      },
      data: null,
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e,
        description: "Bad Request",
      },
      data: null,
    });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  console.log(`updateAccount start time ${new Date().toISOString()}`);

  try {
    const data = req.body;
    const id = req.params.id;

    await accountCollection.doc(id).update(data);

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "update account success",
      },
      data: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e,
        description: "Bad Request",
      },
      data: null,
    });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  console.log(`deleteAccount start time ${new Date().toISOString()}`);

  try {
    const id = req.params.id;

    await accountCollection.doc(id).delete();

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "delete account success",
      },
      data: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e,
        description: "Bad Request",
      },
      data: null,
    });
  }
};

export const getLogin = async (req: Request, res: Response) => {
  console.log(`getLogin start time ${new Date().toISOString()}`);

  try {
    const username = req.body.username;
    const password = req.body.password;

    const resAccount = await accountCollection
      .where("username", "==", username)
      .where("password", "==", password)
      .get();
    console.log(`resAccount ${resAccount}`);

    if (resAccount.empty) {
      return res.status(400).json({
        status: {
          code: 400,
          message: "login failed",
          description: "Bad Request",
        },
        data: null,
      });
    }

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "login success",
      },
      data: {
        type: resAccount.docs[0].data().type,
        name: resAccount.docs[0].data().name,
      },
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e,
        description: "Bad Request",
      },
      data: null,
    });
  }
};
