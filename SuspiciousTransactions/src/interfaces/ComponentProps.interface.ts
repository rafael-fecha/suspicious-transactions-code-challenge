export interface ITransactionProps {
    id: number;
    fromUser: string;
    toUser: string;
    amount: string;
    setTransactionStatusChange: (id: number) => void;
}