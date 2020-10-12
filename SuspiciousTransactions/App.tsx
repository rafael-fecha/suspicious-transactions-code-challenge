import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { queryList } from "./Queries";
import { Transaction } from "./Transaction";

export interface TransactionSuspiciousResponse {
	transactionSuspicious: TransactionSuspicious[]	
}
export interface TransactionSuspicious {
	id: number,
	sender: string,
	recipient: string,
	amount: string,
	currency: string
}

export const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: "#fff",
	  alignItems: "center",
	  justifyContent: "center",
	}
  });

const App = () => {
  const [transactions, setTransactions] = useState<TransactionSuspicious[]>();

  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  const fetchAppData = async (): Promise<JSX.Element | undefined> => {
    try {
      const { loading, data } = await client.query<TransactionSuspiciousResponse>({
        query: queryList.GET_SUSPICIOUS_TRANSITIONS,
        errorPolicy: "all",
	  });

	  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
      setTransactions(data.transactionSuspicious);
    } catch (err) {
	  console.error(`Error fetching suspicious transactions ${err}`)
    }
  };

  const setTransactionStatusChange = (id: number): void => {
    setTransactions(transactions?.filter((t: TransactionSuspicious) => t.id === id));
  };

  useEffect((): void => {
    fetchAppData();
  }, []);

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>Suspicious Transactions</Text>
        {transactions?.map((t: TransactionSuspicious) => (
          <Transaction
            key={t.id}
            id={t.id}
            fromUser={t.recipient}
            toUser={t.sender}
            amount={`${t.currency}${t.amount}`}
            setTransactionStatusChange={setTransactionStatusChange}
          />
        ))}
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
};

export default App;
