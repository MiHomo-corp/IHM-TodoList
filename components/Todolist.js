import React,{useEffect, useState} from "react";
import { Modal, StyleSheet, View, TextInput, Button, Text, FlatList, Switch, TouchableOpacity, CheckBox } from 'react-native';
import { Root, Popup } from 'react-native-popup-confirm-toast'
import { useNavigation } from "@react-navigation/native";
import { getTasks, createTask, setCheckTask, deleteTaskList, deleteTask } from "../API/todoAPI"

export default function TodoList({username,token,title,id,onDeleteTaskList}){
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

  const callback = (username, token, title) => {
    getTasks(username,token,title).then(rep =>{
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
    callback(username, token, title)
  }, [username, token, title])

  return(
    <Root>
      <View>
        <Text>Ma tasklist</Text>
        <Button
            title="Modification projet"
            onPress={console.log("test")}
            />
        <Button
            title="Supprimer ce projet"
            onPress={() => {
              deleteTaskList(id, token).then(response => {
              // Revenir à l'écran précédent une fois le projet supprimé
              onDeleteTaskList(id);
              navigation.goBack();
              })}
            }/>
        <Button
          title="Créer une tâche"
          onPress={() => navigation.navigate("CreateTask")} />
        <FlatList
          style={{ textAlign:'left', paddingLeft: 10, paddingTop:20}}
          data={tasks}
          renderItem={({item}) => 
          <View style={{flexDirection: 'row'}}>
            <CheckBox value={item.done} onValueChange={() => handleChange(item)} />
            <TouchableOpacity onPress={() => {
              navigation.navigate("Task", {
                title: item.content,
                id: item.id,
                token: token,
                onDeleteTask: handleDeleteTask,
              });
            }}>
              <Text>{item.content}</Text>
            </TouchableOpacity>
          </View>
          }
        />
      </View>
      
    </Root>
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