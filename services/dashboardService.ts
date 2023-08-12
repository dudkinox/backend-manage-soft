import { Request, Response } from "express";
import firebase from "../config/firebase";
import { DashboardResponse } from "../models/response/dashboardResponse";

const accountCollection = firebase.collection("defects");

export const getAllDashboard = async (req: Request, res: Response) => {
  console.log(`getAllDashboard start time ${new Date().toISOString()}`);

  try {
    const data = await accountCollection.get();

    const response: DashboardResponse[] = [];

    data.forEach((doc) => {
      response.push({
        id: doc.id,
        project_name: doc.data().project_name,
        status: doc.data().status,
        tag: doc.data().tag,
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

export const createDefect = async (req: Request, res: Response) => {
  console.log(`createDefect start time ${new Date().toISOString()}`);

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

export const deleteProject = async (req: Request, res: Response) => {
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

export const addProjectName = async (req: Request, res: Response) => {
  console.log(`addProjectName start time ${new Date().toISOString()}`);

  try {
    const data = req.body;

    await accountCollection.doc().set(data);

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "add project name success",
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

export const doneProject = async (req: Request, res: Response) => {
  console.log(`doneProject start time ${new Date().toISOString()}`);

  try {
    const id = req.params.id;

    await accountCollection.doc(id).update({ status: "done" });

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "done project success",
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

export const defectProject = async (req: Request, res: Response) => {
  console.log(`defectProject start time ${new Date().toISOString()}`);

  try {
    const id = req.params.id;
    const data = req.body;

    await accountCollection.doc(id).update({ status: "defect" });

    await accountCollection
      .doc(id)
      .collection("defects-details")
      .doc()
      .set(data);

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "defect project success",
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

export const getFindByIdDefect = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const data = await accountCollection.doc(id).get();

    console.log(data.data());

    // const response: DashboardResponse = {
    //   id: data.id,
    //   project_name: data.data()?.project_name,
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
