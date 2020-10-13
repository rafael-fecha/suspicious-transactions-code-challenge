export interface TransactionData {
  id: number;
  recipient: string;
  sender: string;
  amount: number;
  currency: string;
  locale: string;
  createdDateTimestamp: number;
  status: "Suspicious" | "Allowed" | "Blocked";
}

export const transactions: TransactionData[] = [
  {
    id: 1,
    recipient: "Rafa",
    sender: "John",
    amount: 100,
    currency: "USD",
    locale: "en-US",
    createdDateTimestamp: 51531515615156,
    status: "Suspicious"
  },
  {
    id: 2,
    recipient: "Rafa",
    sender: "John",
    amount: 100,
    currency: "EUR",
    locale: "de-DE",
    createdDateTimestamp: 51531515615156,
    status: "Suspicious"
  }
];
