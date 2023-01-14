import React,{useEffect, useState} from "react";

import { StyleSheet, View, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { closeTaskList, getChefsOfManager, getTaskLists } from "../API/todoAPI"
import { TokenContext } from '../Context/Context'

export default function Todolists({hierarchy,username,token}){
  
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState();
  const [newTodoText, setNewTodoText] = useState("");
  const navigation = useNavigation();
  
  const callback = (hierarchy, username, token) => {
      if(hierarchy === "Manager"){
        let usernameInArray = []
        getChefsOfManager(username,token).then(projectChefs => {
          projectChefs.forEach(element => {
            usernameInArray.push(element.username)
          })
        }).then(() => getTaskLists(usernameInArray,token).then(taskList =>{
          setTodos(taskList)
        }))
      }
      else{
        getTaskLists([username],token).then(taskList =>{
          setTodos(taskList)
        })
      }
  }

  const handleDeleteTaskList = (todosId) => {
    setTodos(todos => todos.filter(t => t.id !== todosId));
  };

  const handleNewTaskList = (newTaskList) => {
    setTodos([...todos, newTaskList]);
  }

  const handleModificationTaskList = (updatedTaskList) => {
    setTodos(todos.map(taskList => taskList.id === updatedTaskList.id ? updatedTaskList : taskList));
  }

  useEffect(()=> {
    callback(hierarchy,username, token)
  }, [hierarchy, username, token])
  
  return(
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <>
          {hierarchy === "ProjectChef" ? (
            <Button
              title="Créer un projet"
              onPress={() => { 
                navigation.navigate("CreateProject", {
                  onHandleNewTaskList:handleNewTaskList
                });
              }} />) : []}

          <FlatList
            style={{ textAlign: 'left', paddingLeft: 10, paddingTop: 20 }}
            data={todos}
            renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => {
                navigation.navigate("TodoList", {
                  title: item.title,
                  usernameOfOwner : item.owner.username,
                  onModificationProject:handleModificationTaskList,
                  onDeleteTaskList:handleDeleteTaskList,
                });
              } }>
                <Text style={[{ /*color: '#D6D5A8', textDecorationLine: 'underline'*/ }]}>{item.title+" - "+item.status} {hierarchy === "Manager" ? " - Chef de Projet : "+item.owner.username : ""}</Text>
              </TouchableOpacity>
          </View>} /></>    
      )}
    </TokenContext.Consumer>
  )


}