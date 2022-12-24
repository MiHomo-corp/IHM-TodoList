import React,{useEffect, useState} from "react";

import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch, TouchableOpacity, Checkbox, Alert } from 'react-native';
import { Root, Popup } from 'react-native-popup-confirm-toast'

import { useNavigation } from "@react-navigation/native";

import { getTasks, createTask, setStatusTask, deleteTaskList } from "../API/todoAPI"

//<Checkbox value={item.done} onValueChange={setStatusTask}/>

export default function TodoList({username,token,title}){
  const [tasks, setTask] = useState([]);
  const [project, setProject] = useState([]);
  const navigation = useNavigation();


  //const [newTodoText, setNewTodoText] = useState("");
  //const navigation = useNavigation();

  const callback = (username, token, title) => {
    getTasks(username,token,title).then(rep =>{
      setTask(rep.tasks);
      setProject(rep.taskLists);
    })
  }

  useEffect(()=> {
    callback(username, token, title)
  }, [username, token, title])

  return(
    <Root>
      <View>
        <Text>Ma tasklist</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button
            title="Modification projet"
            onPress={() => { navigation.navigate("ModificationProject", {
              project:project
              });
            }}/>
        <Button
            title="Suppression projet"
            onPress={() => deleteTaskList(project[0].id,token).then(navigation.navigate("TodoLists")) }/>
        <FlatList
          style={{ textAlign:'left', paddingLeft: 10, paddingTop:20}}
          data={tasks}
          renderItem={({item}) => 
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => {
                console.log(item.done)
              }}>
                <Text style={[{color: '#D6D5A8', textDecorationLine: 'underline'}]}>{item.content}</Text>
              </TouchableOpacity>
              
            </View>
          }
        />
      </View>
    </Root>
  )


}