import { Router } from "express";
import { addressesController } from "./addresses.controller.js";

export const addressesRoutes = Router();
addressesRoutes.get("/", addressesController.getAddresses);
