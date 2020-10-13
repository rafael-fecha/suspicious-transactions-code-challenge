import { TransactionData, TransactionStatus } from "./interfaces/transaction.interface";

export const transactions: TransactionData[] = [
  {
    id: 1,
    recipient: "Rafa",
    sender: "John",
    amount: 100,
    currency: "USD",
    locale: "en-US",
    createdDateTimestamp: 51531515615156,
    status: TransactionStatus.Suspicious
  },
  {
    id: 2,
    recipient: "Rafa",
    sender: "John",
    amount: 100,
    currency: "EUR",
    locale: "de-DE",
    createdDateTimestamp: 51531515615156,
    status: TransactionStatus.Suspicious
  }
];
