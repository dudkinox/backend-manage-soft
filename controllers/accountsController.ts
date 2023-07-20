import exports from "express";
import {
  createAccount,
  deleteAccount,
  getAllAccount,
  updateAccount,
  getFindById,
  getLogin,
} from "../services/accountsService";

const Controller = exports.Router();

Controller.get("/account", getAllAccount);
Controller.get("/account/:id", getFindById);
Controller.post("/account", createAccount);
Controller.patch("/account/:id", updateAccount);
Controller.delete("/account/:id", deleteAccount);
Controller.post("/account/login", getLogin);

export default Controller;
