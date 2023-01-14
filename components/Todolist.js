import React,{useEffect, useState} from "react";

import { StyleSheet, View, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

import { useNavigation } from "@react-navigation/native";
import { getTasks, setCheckTask, closeTaskList, deleteTaskList, deleteTask, updateProjectStepDone, nextStepProject } from "../API/todoAPI"


export default function TodoList({hierarchy,username,token,title,id,usernameOfOwner, onDeleteTaskList, onModificationProject}){
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

  const handleModificationTask = updatedTask => {
    setTask(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  }

  

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId, token).then((response) => {
      // Mettre à jour la liste de tâches en filtrant les tâches qui ont l'identifiant de la tâche supprimée
      setTask(tasks.filter((task) => task.id !== taskId));
    });
  };

  const handleNewTask = (newTask) => {
    setTask([...tasks, newTask]);
  }

  const handleUpdateProject = (updatedProject) => {
    setProject(updatedProject);
    onModificationProject(updatedProject)
  }

  useEffect(()=> {
    callback(username, token, title,usernameOfOwner)
  }, [username, token, title,usernameOfOwner])

  return(
      <View>
        <Text>Ce projet est à l'étape de : {project[0]?.status}</Text>
        
        {hierarchy === "Manager" && project[0]?.status !== "Closed" ? (
          <><Button
              title="Modification projet"
              onPress={() => {
                navigation.navigate("ModificationProject", {
                  onUpdateProject:handleUpdateProject,
                  project: project
                });
              } } />
            <Button
            title="Fermeture du projet"
            onPress={() => closeTaskList(project[0].id, token).then(navigation.navigate("TodoLists"))} /></>) : []}

        {project[0]?.status !== "Closed" && project[0]?.status !== "Finished" ? (
          <Button
          title="Créer une tâche"
          onPress={() => {
            navigation.navigate("CreateTask", {
              titleProject: project[0].title,
              idProject: project[0].id,
              onHandleNewTask: handleNewTask
            });
          }} /> 
        ) : []}

        {hierarchy === "ProjectChef" && (project[0]?.status === "Closed" || project[0]?.status === "Finished") ? (
          <><Button
              title="Suppresion du projet"
              onPress={() => deleteTaskList(project[0].id, token).then(onDeleteTaskList(project[0].id)).then(navigation.navigate("TodoLists"))} /></>
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
          onPress={() => nextStepProject(true,project[0].id,project[0].status, token).then(navigation.navigate("TodoLists"))} />
          <Button
          title="Refuser la validation de l'étape"
          onPress={() => nextStepProject(false,project[0].id,project[0].status, token).then(navigation.navigate("TodoLists"))} /></>
        ) : []}

        <FlatList
          style={{ textAlign:'left', paddingLeft: 10, paddingTop:20}}
          data={tasks}
          renderItem={({item}) => 
          <View style={{flexDirection: 'row'}}>
            <Checkbox value={item.done} onValueChange={() => handleChange(item)} />
            <TouchableOpacity onPress={() => {
              navigation.navigate("Task", {
                onDeleteTask:handleDeleteTask,
                onModificationTask:handleModificationTask,
                title: item.content,
                id: item.id,
              });
            }}>
              <Text>{item.content}</Text>
            </TouchableOpacity>
          </View>
          }
        />
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
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});