import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

import { TransactionResolver } from './resolvers/transactionResolver';

async function startServer() {
  const schema = await buildSchema({
    resolvers: [TransactionResolver],
    emitSchemaFile: true
  });

  const app = Express();

  const server = new ApolloServer({
    schema
  });

  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log('Server is running on http://localhost:4000/graphql')
  );
}

startServer();