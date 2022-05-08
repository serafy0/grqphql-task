import "dotenv/config";
import express from "express";

import cors from "cors";
import helmet from "helmet";
import { graphqlHTTP } from "express-graphql";
import { resolvers, schema } from "./schema/schema.js";

const app = express();

app.use(helmet());
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
  })
);

app.listen(8080, () => {
  console.log("now listening");
});
