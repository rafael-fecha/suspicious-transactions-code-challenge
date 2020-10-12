export interface TransactionData {
    id: number;
    recipient: string;
    sender: string;
    amount: number;
    currency: string;
    createdDateTimestamp: number;
    status: 'Suspicious' | 'Allowed' | 'Blocked';
  }
  
  export const transactions: TransactionData[] = [
    {
      id: 1,
      recipient: 'Rafa',
      sender: 'John',
      amount: 100,
      currency: '$',
      createdDateTimestamp: 51531515615156,
      status: 'Suspicious'
    },
    {
      id: 2,
      recipient: 'Rafa',
      sender: 'John',
      amount: 100,
      currency: '$',
      createdDateTimestamp: 51531515615156,
      status: 'Suspicious'
    }
  ];