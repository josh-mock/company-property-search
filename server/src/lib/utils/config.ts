import "dotenv/config";

export const config = {
  PORT: process.env.PORT,
  PRODUCTION: process.env.PRODUCTION === "true",
  DB: process.env.DB,
};
