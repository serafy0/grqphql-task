import { buildSchema } from "graphql";
import { getNames, addName } from "../services/names.js";

const schema = buildSchema(`
  type Name {
    id: ID
    name: String
  }
  type Query {
    getNames(limit: Int, lastId: ID): [Name]
  }

  type Mutation {
    addName(name: String!): Name
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);

const resolvers = {
  getNames: async ({ lastId, limit }) => {
    const names = await getNames(lastId, limit);
    return names;
  },
  addName: async ({ name }) => {
    const [newName] = await addName({ name: name });
    return newName;
  },
};

export { schema, resolvers };
