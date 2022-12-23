import React,{useEffect, useState} from "react";

import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch, TouchableOpacity, Checkbox } from 'react-native';

import { getTask } from "../API/todoAPI"

export default function Task({token,title,id}){
  const [task, setTask] = useState([]);

  //const [newTodoText, setNewTodoText] = useState("");
  //const navigation = useNavigation();

  const callback = (token, title, id) => {
    getTask(token,title,id).then(rep =>{
      setTask(rep.tasks);
    })
  }

  useEffect(()=> {
    callback(token, title, id)
  }, [token, title, id])

  return(
    <View>
      <Text>{task[0]?.content}</Text>
      <Text>Description : </Text>
      <Text>{task[0]?.description}</Text>
    </View>
  )


}