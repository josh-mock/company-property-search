import { Router } from "express";
import { titlesController } from "./titles.controller.js";

export const titlesRoutes = Router();
titlesRoutes.get("/:titleNumber", titlesController.getTitleCompanies);
