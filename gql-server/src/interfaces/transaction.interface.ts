export enum TransactionStatus {
  Suspicious = "Suspicious",
  Allowed = "Allowed",
  Blocked = "Blocked"
}

export interface TransactionData {
  id: number;
  recipient: string;
  sender: string;
  amount: number;
  currency: string;
  locale: string;
  createdDateTimestamp: number;
  status: TransactionStatus;
}
