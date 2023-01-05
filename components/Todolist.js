import React,{useEffect, useState} from "react";

import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch, TouchableOpacity, Checkbox, Alert } from 'react-native';
import { Root, Popup } from 'react-native-popup-confirm-toast'

import { useNavigation } from "@react-navigation/native";

import { getTasks, createTask, setStatusTask, closeTaskList, deleteTaskList, updateProjectStepDone, nextStepProject } from "../API/todoAPI"

//<Checkbox value={item.done} onValueChange={setStatusTask}/>

export default function TodoList({hierarchy,username,token,title,usernameOfOwner}){
  const [tasks, setTask] = useState([]);
  const [project, setProject] = useState([]);
  const navigation = useNavigation();

  const verifDoneTask = ()=> {
    for(let element of tasks){
      if(!element.done){
        return false
      }
    }
    return true
  }
  //const [newTodoText, setNewTodoText] = useState("");
  //const navigation = useNavigation();

  const callback = (username, token, title,usernameOfOwner) => {
    getTasks(usernameOfOwner,token,title).then(rep =>{
      setTask(rep.tasks);
      setProject(rep.taskLists);
    })
  }
  useEffect(()=> {
    callback(username, token, title,usernameOfOwner)
  }, [username, token, title,usernameOfOwner])

  return(
    <Root>
      <View>
        <Text>Ce projet est à l'étape de : {project[0]?.status}</Text>
        {hierarchy === "Manager" && project[0]?.status !== "Closed" ? (
          <><Button
              title="Modification projet"
              onPress={() => {
                navigation.navigate("ModificationProject", {
                  project: project
                });
              } } />
            <Button
            title="Fermeture du projet"
            onPress={() => closeTaskList(project[0].id, token).then(navigation.navigate("TodoLists"))} /></>) : []}
        {hierarchy === "ProjectChef" && (project[0]?.status == "Closed" || project[0]?.status == "Finished") ? (
          <><Button
              title="Suppresion du projet"
              onPress={() => deleteTaskList(project[0].id, token).then(navigation.navigate("TodoLists"))} /></>
        ) : []}
        {hierarchy === "ProjectChef" && verifDoneTask() && project[0]?.status !== "Finished" ? (
          <><Button
          title={project[0]?.projectStepDone ? "Demande de validation en cours..." : "Demande de validation de l'étape"}
          disabled = {project[0]?.projectStepDone}
          onPress={() => updateProjectStepDone(project[0].id, token).then(navigation.navigate("TodoLists"))} /></>
        ) : []}
        {hierarchy === "Manager" && project[0]?.projectStepDone && project[0]?.status !== "Finished" ? (
          <><Button
          title="Confirmation de l'étape"
          onPress={() => nextStepProject(project[0].id,project[0].status, token).then(navigation.navigate("TodoLists"))} /></>
        ) : []}
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