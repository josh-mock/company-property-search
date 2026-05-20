import { companiesRoutes } from "@companies/companies.routes.js";
import { titlesRoutes } from "@titles/titles.routes.js";
import { addressesRoutes } from "@addresses/addresses.routes.js";
import { Router } from "express";

export const routes = Router();
routes.use("/companies", companiesRoutes);
routes.use("/titles", titlesRoutes);
routes.use("/addresses", addressesRoutes);
