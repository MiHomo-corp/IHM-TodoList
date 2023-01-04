import React,{useEffect, useState} from "react";

import { StyleSheet, View, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { getTaskList, deleteTaskList, getUserId } from "../API/todoAPI"
import { TokenContext } from '../Context/Context'

export default function Todolists({username,token}){
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState();
  const [newTodoText, setNewTodoText] = useState("");
  const navigation = useNavigation();
  
  const callback = (username, token) => {
    getTaskList(username,token).then((taskLists) =>{
      setTodos(taskLists)
    })
  }

  useEffect(()=> {
    callback(username, token)
  }, [username, token])
  
  const getId = (username, token) => {
    getUserId(username, token).then(id => {
      setUserId(id[0].id)
    })
  }

  const handleDeleteTaskList = (todoId) => {
    deleteTaskList(todoId, token).then((response) => {
      // Mettre à jour la liste de tasklists en filtrant la tasklist qui a l'identifiant de la tasklist supprimée
      setTodos(todos.filter((todo) => todo.id !== todoId));
    });
  };

  useEffect(()=> {
    getId(username, token)
  }, [username, token])

  return(
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <><Button
          title="Créer un projet"
          onPress={() => navigation.navigate("CreateProject")} />
          <FlatList
            style={{ textAlign: 'left', paddingLeft: 10, paddingTop: 20 }}
            data={todos}
            renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => {
                navigation.navigate("TodoList", {
                  title: item.title,
                  id: item.id,
                  token: token,
                  onDeleteTaskList: handleDeleteTaskList,
                });
              } }>
                <Text style={[{ color: '#D6D5A8', textDecorationLine: 'underline' }]}>{item.title}</Text>
              </TouchableOpacity>
          </View>} /></>    
      )}
    </TokenContext.Consumer>
  )
}