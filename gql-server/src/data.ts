import { TransactionData, TransactionStatus } from "./interfaces/transaction.interface";

export const transactions: TransactionData[] = [
  {
    id: 1,
    recipient: "5ct",
    sender: "9cd",
    amount: 100,
    currency: "USD",
    locale: "en-US",
    createdDateTimestamp: 1602631000,
    status: TransactionStatus.Suspicious
  },
  {
    id: 2,
    recipient: "1dd",
    sender: "8aa",
    amount: 100,
    currency: "USD",
    locale: "en-US",
    createdDateTimestamp: 1602631559,
    status: TransactionStatus.Suspicious
  }
];
