import { useMutation } from "react-apollo";

import { queryList } from "./Queries";

import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import React, { SFC } from "react";

interface ITransactionProps {
    id: number;
    fromUser: string;
    toUser: string;
    amount: string;
    setTransactionStatusChange: (id: number) => void
}

interface ITextConfigs {
  style: any;
  property: string;
  value: keyof ITransactionProps;
}

export const styles = StyleSheet.create({
  transaction: {
    margin: "10px",
    // border: "solid 0.5px gray",
    flexDirection: "row",
    display: "flex",
    padding: "10px",
  },
  bold: {
    paddingTop: "10px",
    fontWeight: "bold",
  },
  text: {
    paddingTop: "10px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    height: "max-content",
    borderRadius: 20,
    padding: "10px",
  },
});

const textConfigs: ITextConfigs[] = [
  {
    style: styles.bold,
    property: "Transaction ID:",
    value: "id",
  },
  {
    style: styles.text,
    property: "From user:",
    value: "fromUser",
  },
  {
    style: styles.text,
    property: "To user:",
    value: "toUser",
  },
  {
    style: styles.bold,
    property: "",
    value: "amount",
  },
];

export const Transaction: SFC<ITransactionProps> = (props) => {
  const [
    markTransaction,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(queryList.MARK_TRANSACTION, {
    onCompleted(data: {
        markTransactionSuspicious: {
            id: number;
        }
    }) {
      if (data) {
        props.setTransactionStatusChange(data.markTransactionSuspicious.id);
      }
    },
  });

  if (mutationLoading)
    return <ActivityIndicator size="large" color="#0000ff" />;
  if (mutationError) return <p>Error :(</p>;

  return (
    <View style={styles.transaction}>
      <View>
        {textConfigs.map((text, i) => {
          return (
            <Text key={`${props.id}${i}`} style={text.style}>
              {text.property} {props[text.value]}
            </Text>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={() =>
            markTransaction({
              variables: { transactionData: { id: 1, status: "Blocked" } },
            })
          }
        >
          <Text style={{ color: "white" }}>Block</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, { backgroundColor: "blue" }]}
          onPress={() =>
            markTransaction({
              variables: { transactionData: { id: 1, status: "Allowed" } },
            })
          }
        >
          <Text style={{ color: "white" }}>Allow</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
