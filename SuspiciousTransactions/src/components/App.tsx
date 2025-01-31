import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";

import { queryList } from "../configs/Queries";

import { Transaction } from "./Transaction/Transaction";
import {
  TransactionSuspicious,
  TransactionSuspiciousResponse
} from "../interfaces/QueryResponses.interface";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

const App = () => {
  const [transactions, setTransactions] = useState<TransactionSuspicious[]>();

  const client = new ApolloClient({
    uri: "http://localhost:4001/graphql",
    cache: new InMemoryCache()
  });

  const fetchAppData = async (): Promise<JSX.Element | undefined> => {
    try {
      const { loading, data } = await client.query<
        TransactionSuspiciousResponse
      >({
        query: queryList.GET_SUSPICIOUS_TRANSITIONS
      });

      if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
      
      setTransactions(data.transactionSuspicious);
    } catch (err) {
      console.error(`Error fetching suspicious transactions ${err}`);
    }
  };

  const setTransactionStatusChange = (id: number): void => {
    setTransactions(
      transactions?.filter((t: TransactionSuspicious) => t.id !== id)
    );
  };

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

  useEffect((): void => {
    fetchAppData();
  }, []);

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text style={styles.title}>Suspicious Transactions</Text>
        {transactions?.length > 0 ? (
          transactions
            .sort((a,b) => b.createdDateTimestamp - a.createdDateTimestamp)
            .map((t: TransactionSuspicious) => (
              <Transaction
                key={t.id}
                id={t.id}
                fromUser={t.recipient}
                toUser={t.sender}
                amount={formatAmount(t.amount, t.currency, t.locale)}
                setTransactionStatusChange={setTransactionStatusChange}
              />
            ))
        ) : (
          <p>No transactions.</p>
        )}
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
};

export default registerRootComponent(App);
