import exports from "express";
import {
  createAccount,
  deleteAccount,
  getAllAccount,
  updateAccount,
  getFindById,
  getLogin,
} from "../services/accountsService";
import { createDefect, getAllDashboard } from "../services/dashboardService";

const Controller = exports.Router();

Controller.get("/account", getAllAccount);
Controller.get("/account/:id", getFindById);
Controller.post("/account", createAccount);
Controller.patch("/account/:id", updateAccount);
Controller.delete("/account/:id", deleteAccount);
Controller.post("/account/login", getLogin);

Controller.get("/dashboard", getAllDashboard);
Controller.post("/defect", createDefect);

export default Controller;
