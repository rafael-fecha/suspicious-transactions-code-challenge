import { Arg, Query, Mutation, Resolver } from "type-graphql";

import Transaction from "../schemas/Transaction";
import { TransactionInput } from "./transactionInput";
import { TransactionData, TransactionStatus } from "../interfaces/transaction.interface";

import { transactions } from "../data";

@Resolver(of => Transaction)
export class TransactionResolver {
  @Query(returns => [Transaction])
  transactionSuspicious(): TransactionData[] | undefined {
    return transactions.filter(
      transaction => transaction.status === TransactionStatus.Suspicious
    );
  }

  @Mutation(returns => Transaction)
  markTransactionSuspicious(@Arg("transactionData")
  {
    id,
    status
  }: TransactionInput): TransactionData {
    const foundTransaction = transactions.find((t) => t.id === id);
    this.blockTransactions(foundTransaction);
    return foundTransaction;
  }

  private blockTransactions(transaction) {
    console.log('blockTransactions', transaction);
    transaction.status = 'blocked';
  
  const foundTransactions = transactions.filter(t => {
        return this.findTransactionWhereRecipientIsSender(transaction, t);
  });
  
  foundTransactions.forEach((t) => {
    this.blockTransactions(t);
  })
  
  }
  
  private findTransactionWhereRecipientIsSender(transaction, t) {
    return transaction?.recipient === t.sender;
  }
}
