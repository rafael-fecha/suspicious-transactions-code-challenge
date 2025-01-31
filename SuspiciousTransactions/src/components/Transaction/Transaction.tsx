import { useMutation } from "react-apollo";

import { queryList } from "../../configs/Queries";

import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";

import { StatusBar } from "expo-status-bar";

import React, { SFC } from "react";

import { ITransactionProps } from "../../interfaces/ComponentProps.interface";
import { ITextConfigs } from "../../interfaces/ComponentConfigs.interface";

export const styles = StyleSheet.create({
  transaction: {
    margin: "10px",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "rgb(241, 241, 241)",
    borderRadius: 10,
    flexDirection: "row",
    display: "flex",
    padding: "10px"
  },
  bold: {
    paddingTop: "10px",
    fontWeight: "bold"
  },
  text: {
    paddingTop: "10px"
  },
  buttonContainer: {
    display: "flex",
    alignItems: 'flex-end',
    flexDirection: "row"
  },
  button: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    height: "max-content",
    padding: "10px"
  }
});

const textConfigs: ITextConfigs[] = [
  {
    style: styles.bold,
    property: "Transaction ID:",
    value: "id"
  },
  {
    style: styles.text,
    property: "From User:",
    value: "fromUser"
  },
  {
    style: styles.text,
    property: "To User:",
    value: "toUser"
  },
  {
    style: styles.bold,
    property: "",
    value: "amount"
  }
];

export const Transaction: SFC<ITransactionProps> = props => {
  const [
    markTransaction,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(queryList.MARK_TRANSACTION, {
    onCompleted(data: {
      markTransactionSuspicious: {
        id: number;
      };
    }) {
      if (data) {
        props.setTransactionStatusChange(data.markTransactionSuspicious.id);
      }
    }
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
          style={[styles.button, { backgroundColor: "rgb(192, 90, 90)" }]}
          onPress={() =>
            markTransaction({
              variables: { transactionData: { id: props.id, status: "Blocked" } }
            })
          }
        >
          <Text style={{ color: "white" }}>Block</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, { backgroundColor: "rgb(39, 196, 180)", marginLeft: '8px' }]}
          onPress={() =>
            markTransaction({
              variables: { transactionData: { id: props.id, status: "Allowed" } }
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
