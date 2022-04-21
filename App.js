import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";
import AppBar from "./src/components/AppBar";
import TodoList from "./src/components/TodoList";

export default function App() {
  const [title, setTitle] = useState("");
  const [quantidade, setQuantidade] = useState(null);
  const [preco, setPreco] = useState(null);
  const [searchText, setSearchText] = useState('');

  // iniitalize empty object todo
  const [todo, setTodo] = useState({});

  // Initalize empty array to store todos
  const [todos, setTodos] = useState([]);

  // function to add todo object in todo list
  const addTodo = () => {
    if (title.length > 0) {
      // Add todo to the list
      setTodos([...todos, { key: Date.now(), name: title, quant: quantidade, preco: preco, isChecked: false }]);
      // clear the value of the textfield
      setTitle("");
      setQuantidade("")
      setPreco("")

      console.log(todos)
    }
  };

  // function to mark todo as checked or unchecked
  const checkTodo = id => {
    // loop through todo list and look for the the todo that matches the given id param
    // update the state using setTodos function
    setTodos(
      todos.map(todo => {
        if (todo.key === id) {
          todo.isChecked = !todo.isChecked;
        }
        return todo;
      })
    );
  };

  // function to delete todo from the todo list
  const deleteTodo = id => {
    // loop through todo list and return todos that don't match the id
    // update the state using setTodos function
    setTodos(todos.filter(todo => {
      return todo.key !== id;
    }));
  };

  useEffect(() => {
    console.log(todos.length, "TodoList length");
    //console.log(todos);
  }, [todos]);


  useEffect(() => {
    if (searchText === '') {
      setTodos(todos);
    } else {
      setTodos(
        todos.filter(
          (item) =>
            item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  const handleOrderClick = () => {
    let newList = [...todos];

    newList.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

    setTodos(newList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}></View>
      <AppBar />
      <View style={styles.todo}>
        <TextInput
          placeholder="Add a produto"
          value={title}
          onChangeText={value => setTitle(value)}
          style={styles.textbox}
        />

        <TextInput
          placeholder="Add a quantidade"
          value={quantidade}
          onChangeText={value => setQuantidade(value)}
          style={styles.textbox}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Add a preco"
          value={preco}
          onChangeText={value => setPreco(value)}
          style={styles.textbox}
          keyboardType="numeric"
        />
        <Button title="Add" color="#7F39FB" onPress={() => addTodo()} />
      </View>


      <View style={styles.searchArea}>
      <TextInput
          style={styles.inputbar}
          placeholder="Pesquise uma produto"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
        />
        <TouchableOpacity onPress={handleOrderClick} style={styles.orderButtonbar}>
          <text>Ordernar</text>
        </TouchableOpacity>
      </View>
        
      <ScrollView>
        {todos.map(todo => (
          <TodoList
            key={todo.key}
            todo={todo}
            checkTodo={checkTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#7F39FB",
    color: "#fff",
    width: "100%",
    height: 30
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  todo: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  textbox: {
    borderWidth: 1,
    borderColor: "#7F39FB",
    borderRadius: 8,
    padding: 10,
    margin: 10,
    width: "80%"
  },
  containerbar: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputbar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#7F39FB",
    borderRadius: 8,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 15,
    width: "80%"
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32, 
    marginBottom: 32
  },
  orderButtonbar: {
    backgroundColor: "#7F39FB",
    color: "#fff",
    width: 60,
    height: 48,
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 8,
    marginRight: 30,
  },
  listBar: {
    flex: 1,
  },
});
