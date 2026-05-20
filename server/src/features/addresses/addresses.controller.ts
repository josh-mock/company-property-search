import type { Request, Response } from "express";
import { addressesService } from "./addresses.service.js";
import { addressSearchQuerySchema } from "./addresses.schemas.js";

const getAddresses = async (req: Request, res: Response) => {
  const query = addressSearchQuerySchema.parse(req.query);

  const result = await addressesService.getAddresses(query);

  return res.status(200).json(result);
};

export const addressesController = {
  getAddresses,
};
