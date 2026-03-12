import { config } from "@/lib/utils/config.js";
import { app } from "./app.js";

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
