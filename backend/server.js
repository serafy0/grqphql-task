import express from "express";

import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());

app.listen(8080, () => {
  console.log("now listening");
});
