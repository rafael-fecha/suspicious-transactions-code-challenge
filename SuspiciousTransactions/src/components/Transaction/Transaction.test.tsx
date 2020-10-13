import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Transaction } from "./Transaction";

import { MockedProvider } from "@apollo/react-testing";

import { mocks } from "../../__mocks__/queryMocks";

describe("Transaction component", () => {
  it("should call a parent function when marking a transaction as blocked or accepted", async () => {
    const testFunctionCall = jest.fn();

    const formatAmount = (
      amount: number,
      currency: string,
      locale: string
    ): string => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency
      }).format(amount);
    };

    const { queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Transaction
          key={1}
          id={1}
          fromUser={"John"}
          toUser={"Michael"}
          amount={formatAmount(10, "EUR", "de-DE")}
          setTransactionStatusChange={testFunctionCall}
        />
      </MockedProvider>
    );

    fireEvent.press(queryByText("Allow"));
    await waitFor(() => expect(testFunctionCall).toHaveBeenCalled());
  });
});
