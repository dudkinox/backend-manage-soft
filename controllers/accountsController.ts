import exports from "express";
import {
  createAccount,
  getAllAccount,
  updateAccount,
  getFindById,
  getLogin,
  deleteAccount,
} from "../services/accountsService";
import {
  addProjectName,
  createDefect,
  deleteProject,
  getAllDashboard,
  doneProject,
  defectProject,
  getFindByIdDefect,
  getAllDetailDefect,
  getDetailDefectById,
} from "../services/dashboardService";

const Controller = exports.Router();

Controller.get("/account", getAllAccount);
Controller.get("/account/:id", getFindById);
Controller.post("/account", createAccount);
Controller.patch("/account/:id", updateAccount);
Controller.post("/account/login", getLogin);
Controller.delete("/account/:id", deleteAccount);

Controller.get("/dashboard", getAllDashboard);
Controller.post("/defect", createDefect);
Controller.post("/project", addProjectName);
Controller.delete("/project/:id", deleteProject);
Controller.post("/project-done/:id", doneProject);
Controller.post("/project-defect/:id", defectProject);
Controller.get("/project-defect/:id", getFindByIdDefect);
Controller.get("/defect/detail-all", getAllDetailDefect);
Controller.get("/defect/detail/:id", getDetailDefectById);

export default Controller;
