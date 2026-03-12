import { routes } from "@/routes.js";
import express from "express";
import morgan from "morgan";
import { handleError } from "./lib/middleware/handle-error.js";
import { handleNotFound } from "./lib/middleware/handle-not-found.js";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "./lib/utils/config.js";

export const app = express();

app.use(morgan("tiny"));
app.use(express.json());

// Production: serve static frontend
if (config.PRODUCTION) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const distPath = path.join(__dirname, "../../client/dist");

  app.use(express.static(distPath));
  app.get(/^(?!\/api)/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.use("/api", routes);
app.use(handleNotFound);
app.use(handleError);
