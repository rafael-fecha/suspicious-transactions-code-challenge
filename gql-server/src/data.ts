import { TransactionData, TransactionStatus } from "./interfaces/transaction.interface";

export const transactions: TransactionData[] = [
  {
    id: 1,
    recipient: "B",
    sender: "A",
    amount: 100,
    currency: "USD",
    locale: "en-US",
    createdDateTimestamp: 1602631000,
    status: TransactionStatus.Suspicious
  },
  {
    id: 2,
    recipient: "C",
    sender: "B",
    amount: 100,
    currency: "USD",
    locale: "en-US",
    createdDateTimestamp: 1602631559,
    status: TransactionStatus.Suspicious
  },
  {
    id: 3,
    recipient: "E",
    sender: "D",
    amount: 100,
    currency: "USD",
    locale: "en-US",
    createdDateTimestamp: 1602631559,
    status: TransactionStatus.Suspicious
  },
  {
    id: 4,
    recipient: "E",
    sender: "A",
    amount: 100,
    currency: "USD",
    locale: "en-US",
    createdDateTimestamp: 1602631559,
    status: TransactionStatus.Suspicious
  },
  {
    id: 5,
    recipient: "F",
    sender: "E",
    amount: 100,
    currency: "USD",
    locale: "en-US",
    createdDateTimestamp: 1602631559,
    status: TransactionStatus.Suspicious
  },
  {
    id: 6,
    recipient: "D",
    sender: "B",
    amount: 100,
    currency: "USD",
    locale: "en-US",
    createdDateTimestamp: 1602631559,
    status: TransactionStatus.Suspicious
  },
  {
    id: 7,
    recipient: "E",
    sender: "B",
    amount: 100,
    currency: "USD",
    locale: "en-US",
    createdDateTimestamp: 1602631559,
    status: TransactionStatus.Suspicious
  },
  {
    id: 8,
    recipient: "X",
    sender: "F",
    amount: 100,
    currency: "USD",
    locale: "en-US",
    createdDateTimestamp: 1602631559,
    status: TransactionStatus.Suspicious
  },
  {
    id: 9,
    recipient: "Y",
    sender: "G",
    amount: 100,
    currency: "USD",
    locale: "en-US",
    createdDateTimestamp: 1602631559,
    status: TransactionStatus.Suspicious
  }
];
