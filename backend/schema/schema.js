import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import { getNames, addName } from "../services/names.js";

const NameType = new GraphQLObjectType({
  name: "Name",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const RooTQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getNames: {
      type: new GraphQLList(NameType),
      resolve: async (parent, args) => {
        const names = await getNames();
        return names;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addName: {
      type: NameType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const [newName] = await addName({ name: args.name });
        return newName;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RooTQuery,
  mutation: Mutation,
});
export { schema };
