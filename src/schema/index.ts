import "graphql-import-node";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLSchema } from "graphql";
import resolvers from "../resolvers";

import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const loadedFiles = loadFilesSync(`${__dirname}/**/*.graphql`);
const typeDefs = mergeTypeDefs(loadedFiles);

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
