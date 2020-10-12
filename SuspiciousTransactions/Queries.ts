import gql from "graphql-tag";

export const queryList = {
  GET_SUSPICIOUS_TRANSITIONS: gql`
    query {
      transactionSuspicious {
        id
        sender
        recipient
        amount
        currency
      }
    }
  `,
  MARK_TRANSACTION: gql`
    mutation MarkTransactionSuspicious($transactionData: TransactionInput!) {
      markTransactionSuspicious(transactionData: $transactionData) {
        id
        sender
        status
      }
    }
  `
};
