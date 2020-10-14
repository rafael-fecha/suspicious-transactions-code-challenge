export interface TransactionSuspiciousResponse {
    transactionSuspicious: TransactionSuspicious[];
}

export interface TransactionSuspicious {
    id: number;
    sender: string;
    recipient: string;
    amount: number;
    currency: string;
    locale: string;
    createdDateTimestamp: number;
}