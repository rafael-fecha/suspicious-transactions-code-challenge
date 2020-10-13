import { queryList } from "../configs/Queries";

export const mocks = [
    {
      request: {
        query: queryList.MARK_TRANSACTION,
        variables: { transactionData: { id: 1, status: "Allowed" } }
      },
      result: {
        data: {
          markTransactionSuspicious: {
            id: 1,
            sender: "John",
            status: "Allowed"
          }
        }
      }
    }
  ];