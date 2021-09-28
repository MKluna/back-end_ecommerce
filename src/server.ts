import { IContext } from "./interfaces/context.interface";
import express from "express";
import cors from "cors";
import compression from "compression";
import { createServer } from "http";
import environment from "./config/enviroments";
import { ApolloServer } from "apollo-server-express";
import expressPlayground from "graphql-playground-middleware-express";
import schema from "./schema";
import Database from "./lib/database";

if (process.env.NODE_ENV !== "production") {
  const env = environment;
}

async function init() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(compression());

  const database = new Database();
  const db = await database.init();

  const context = async ({ req, connection }: IContext) => {
    const token = req ? req.headers.authorization : connection.authorization;
    return { db, token };
  };

  const server = new ApolloServer({
    schema,
    introspection: true,
    context,
  });

  server.applyMiddleware({ app });

  app.get(
    "/",
    expressPlayground({
      endpoint: "/graphql",
    })
  );

  const httpServer = createServer(app);
  const PORT = process.env.PORT || 2002;

  httpServer.listen({ port: PORT }, () =>
    console.log(`Server ready on port ${PORT}, http://localhost:${PORT}`)
  );
}

init();
