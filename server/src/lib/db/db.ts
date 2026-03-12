import type { Database } from "./db.types.js";
import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect, CamelCasePlugin } from "kysely";
import { config } from "../utils/config.js";

const dialect = new SqliteDialect({
  database: new SQLite(config.DB),
});

const plugins = [new CamelCasePlugin()];

export const db = new Kysely<Database>({
  dialect,
  plugins,
});
