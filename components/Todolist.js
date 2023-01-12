import React,{useEffect, useState} from "react";

import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper'
import { Divider } from 'react-native-elements';
import Checkbox from 'expo-checkbox';

import { useNavigation } from "@react-navigation/native";
import { getTasks, setCheckTask, closeTaskList, deleteTaskList, deleteTask, updateProjectStepDone, nextStepProject } from "../API/todoAPI"


export default function TodoList({hierarchy,username,token,title,id,usernameOfOwner, onDeleteTaskList}){
  const [tasks, setTask] = useState([]);
  const [project, setProject] = useState([]);
  const navigation = useNavigation();

  // Fonction de gestion d'événement qui sera appelée lorsque la valeur de la checkbox change
  const handleChange = (item) => {
    setCheckTask(item.id, token, !item.done)
    .then((response) => {
      // Mise à jour de la valeur de "item.done" dans la liste de tâches
      const updatedTasks = tasks.map((task) => {
        if (task.id === item.id) {
          return { ...task, done: !task.done };
        }
        return task;
      });
      setTask(updatedTasks);
    });
  };
  const verifDoneTask = ()=> {
    for(let element of tasks){
      if(!element.done){
        return false
      }
    }
    return true
  }

  const callback = (username, token, title,usernameOfOwner) => {
    getTasks(usernameOfOwner,token,title).then(rep =>{
      setTask(rep.tasks);
      setProject(rep.taskLists);
    })
  }

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId, token).then((response) => {
      // Mettre à jour la liste de tâches en filtrant les tâches qui ont l'identifiant de la tâche supprimée
      setTask(tasks.filter((task) => task.id !== taskId));
    });
  };

  useEffect(()=> {
    callback(username, token, title,usernameOfOwner)
  }, [username, token, title,usernameOfOwner])

  return(
      <View>
        {hierarchy === "Manager" ?(
          <>
            <Text variant="headlineLarge" style={styles.title}>{project[0]?.title} </Text>
            <Text variant="labelSmall" style={styles.subtitle}>par {usernameOfOwner}</Text>
          </>
        ):[]}
        {hierarchy === "ProjectChef" ?(
          <>
            <Text variant="headlineLarge" style={styles.title}>{project[0]?.title} </Text>
          </>
        ):[]}
        <Divider />
        <Text style={styles.status}>Status : {project[0]?.status}</Text>

        {hierarchy === "ProjectChef" && verifDoneTask() && project[0]?.status !== "Finished" ? (
          <>
            <View style={{alignItems:"center",marginTop:10,marginBottom:10}}>
              <Button
                style={{width:350}}
                labelStyle={{color: '#22577A'}}
                buttonColor='#90D7B4'
                mode="contained"
                disabled = {project[0]?.projectStepDone}
                onPress={() => updateProjectStepDone(project[0].id, token).then(navigation.navigate("TodoLists"))}>
                  {project[0]?.projectStepDone ? "Demande de validation en cours..." : "Demande de validation de l'étape"}
              </Button>
            </View>
          </>
        ) : []}

        {hierarchy === "Manager" && project[0]?.projectStepDone && project[0]?.status !== "Finished" ? (
          <>
            <View style={{flexDirection:"row",padding:5}}>
              <Button
                style={styles.button}
                labelStyle={{color: '#22577A'}}
                buttonColor='#90D7B4'
                mode="contained"
                onPress={() => nextStepProject(true,project[0].id,project[0].status, token).then(navigation.navigate("TodoLists"))} >
                  Validé l'étape
              </Button>
              <Button
                style={styles.button}
                labelStyle={{color: '#EBF7F3'}}
                buttonColor='#B22222'
                mode="contained"
                onPress={() => nextStepProject(false,project[0].id,project[0].status, token).then(navigation.navigate("TodoLists"))}>
                  Refusé l'étape
              </Button>
            </View>
          </>
        ) : []}

        <FlatList
          style={{ paddingLeft: 10, paddingTop:20}}
          data={tasks}
          renderItem={({item}) => 
          <View style={{flexDirection: 'row', alignItems:"center", justifyContent:"center"}}>
            <Checkbox value={item.done} style={styles.checkbox} onValueChange={() => handleChange(item)} />
            <TouchableOpacity onPress={() => {
              navigation.setOptions({
                onDeleteTask:handleDeleteTask
              })
              navigation.navigate("Task", {
                title: item.content,
                id: item.id,
                token: token,
              });
            }}>
              <Text style={styles.label}>{item.content}</Text>
            </TouchableOpacity>
          </View>
          }
        />
      
        {project[0]?.status !== "Closed" && project[0]?.status !== "Finished" ? (
          <View style={{alignItems:"center",marginTop:30}}>
            <Button
            style={{width:250,height:50,justifyContent:"center"}}
            labelStyle={{color: '#22577A'}}
            buttonColor='#90D7B4'
            mode="contained"
            icon="plus-box"
            onPress={() => {
              navigation.navigate("CreateTask", {
                titleProject: project[0].title,
                idProject: project[0].id
              });
            }} >NOUVELLE TÂCHE</Button>
          </View>
        ) : []}

        {hierarchy === "ProjectChef" && (project[0]?.status === "Closed" || project[0]?.status === "Finished") ? (
          <><Button
              title="Suppresion du projet"
              onPress={() => deleteTaskList(project[0].id, token).then(navigation.navigate("TodoLists"))} /></>
        ) : []}

        {hierarchy === "Manager" && project[0]?.status !== "Closed" ? (
          <>
            <View style={{flexDirection:"row",marginTop:40}}>
              <Button
                style={styles.button}
                labelStyle={{color: '#22577A'}}
                buttonColor='#90D7B4'
                mode="contained"
                onPress={() => {
                  navigation.navigate("ModificationProject", {
                    project: project
                  });
                } }>
                  Modifier le projet
              </Button>
              <Button
                style={styles.button}
                labelStyle={{color: '#EBF7F3'}}
                buttonColor='#B22222'
                mode="contained"
                onPress={() => closeTaskList(project[0].id, token).then(navigation.navigate("TodoLists"))}>
                  Fermer le projet
              </Button>
            </View>
          </>
        ) : []}

      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    marginVertical:7,
    padding:10,
    marginRight:10,
    marginLeft:0
  },
  button:{
    flex:1,
    margin:5
  },
  title: {
    textAlign:"center",
    color:"#22577A"
  },
  subtitle:{
    textAlign:"center",
    color:"#01796F",
    marginBottom:5
  },
  status:{
    textAlign:"center",
    color:"#01796F",
    marginTop:5
  },
  label: {
    fontSize:16,
    color:"#22577A",
    textDecorationLine:"underline",
    fontWeight:"bold"
  },
});
