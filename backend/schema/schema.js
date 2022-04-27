import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import { getNames } from "../services/names.js";

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
      async resolve(parent, args) {
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
      async resolve(parent, args) {},
    },
  },
});

const schema = new GraphQLSchema({
  query: RooTQuery,
  mutation: Mutation,
});
export { schema };
