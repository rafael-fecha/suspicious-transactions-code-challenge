import "reflect-metadata";
import { buildSchema } from "type-graphql";

const { ApolloServer, gql } = require("apollo-server-express");
const { createTestClient } = require("apollo-server-testing");

import { TransactionResolver } from "../resolvers/transactionResolver";
import { transactions } from "../data";

it("should get only the suspicious transactions", async () => {
  const schema = await buildSchema({
    resolvers: [TransactionResolver],
    emitSchemaFile: true
  });

  const server = new ApolloServer({
    schema
  });

  const { query, mutate } = createTestClient(server);

  const {
    data: { transactionSuspicious }
  } = await query({
    query: gql`
      query {
        transactionSuspicious {
          id
          sender
          recipient
          amount
          currency
          locale
          createdDateTimestamp
          status
        }
      }
    `
  });

  const result = JSON.parse(JSON.stringify(transactionSuspicious));
  expect(result).toEqual(transactions);
});

it("should mark the transaction as blocked", async () => {
  const schema = await buildSchema({
    resolvers: [TransactionResolver],
    emitSchemaFile: true
  });

  const server = new ApolloServer({
    schema
  });

  const { mutate } = createTestClient(server);

  const {
    data: { markTransactionSuspicious }
  } = await mutate({
    mutation: gql`
      mutation MarkTransactionSuspicious($transactionData: TransactionInput!) {
        markTransactionSuspicious(transactionData: $transactionData) {
          id
          sender
          status
        }
      }
    `,
    variables: { transactionData: { id: 1, status: "Blocked" } }
  });

  const result = JSON.parse(JSON.stringify(markTransactionSuspicious));
  expect(result.status).toEqual("Blocked");
});
