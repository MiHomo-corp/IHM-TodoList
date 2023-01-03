import React,{useEffect, useState} from "react";

import { StyleSheet, View, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { deleteTaskList, getChefsOfManager, getTaskLists } from "../API/todoAPI"
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
      else if(hierarchy === "ProjectChef"){
        getTaskLists([username],token).then(taskList =>{
          setTodos(taskList)
        })
      }
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
              onPress={() => navigation.navigate("CreateProject")} />) : []}
          <Button
          title="Déconnexion"
          onPress={() => navigation.navigate("SignOut")} />
          <FlatList
            style={{ textAlign: 'left', paddingLeft: 10, paddingTop: 20 }}
            data={todos}
            renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => {
                navigation.navigate("TodoList", {
                  title: item.title,
                  token: token
                });
              } }>
                <Text style={[{ color: '#D6D5A8', textDecorationLine: 'underline' }]}>{item.title}</Text>
              </TouchableOpacity>
          </View>} /></>    
      )}
    </TokenContext.Consumer>
  )


}