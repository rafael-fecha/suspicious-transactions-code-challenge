import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Transaction } from "./Transaction";

import { MockedProvider } from '@apollo/react-testing';
import { queryList } from "./Queries";

const mocks = [
    {
      request: {
        query: queryList.MARK_TRANSACTION,
        variables: { transactionData: { id: 1, status: "Allowed" } },
      },
      result: {
        data: {
            markTransactionSuspicious: {
                id: 1,
                sender: "John",
                status: "Allowed"
              },
        },
      },
    },
  ];


describe("Transaction component", () => {
  it("should call a parent function when marking a transaction as blocked or accepted", async () => {
    const testFunctionCall = jest.fn();

    const formatAmount = (amount: number, currency: string, locale: string): string => {
        return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(amount);
    }
   
    const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
        <Transaction
            key={1}
            id={1}
            fromUser={'TEST'}
            toUser={'TEST'}
            amount={formatAmount(10, 'EUR', 'de-DE')}
            setTransactionStatusChange={testFunctionCall}
        />
      </MockedProvider>,
    );

    fireEvent.press(queryByText('Allow'));
    await waitFor(() => expect(testFunctionCall).toHaveBeenCalled());
  });
});