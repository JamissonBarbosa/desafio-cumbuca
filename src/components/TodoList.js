import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
//import Icon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function TodoList(props) {
  //console.log(props.todo, "logging props");
  return (
    <View style={styles.listTile}>
      <Text style={styles.title}>{props.todo.name}</Text>
      <Text style={styles.title}>{props.todo.preco}</Text>
      <Text style={styles.title}>{props.todo.quant}</Text>
      <Icon
        name="delete"
        style={styles.trailing}
        size={20}
        color="#666666"
        onPress={() => props.deleteTodo(props.todo.key)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listTile: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#666666"
  },
  leading: {
    width: 50
  },
  title: {
    width: 80,
    height: 30,
    fontSize: 14

  },
  trailing: {
    width: 32
  }
});
