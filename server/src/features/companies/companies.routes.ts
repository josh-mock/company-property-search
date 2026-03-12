import { Router } from "express";
import { companiesController } from "./companies.controller.js";

export const companiesRoutes = Router();
companiesRoutes.get("/", companiesController.getCompanies);
companiesRoutes.get("/:companyId/titles", companiesController.getCompanyTitles);
