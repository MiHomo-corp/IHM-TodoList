import React,{useEffect, useState} from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch, TouchableOpacity, Checkbox } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getTask , deleteTask } from "../API/todoAPI"

export default function Task({hierarchy,token,title,id,onDeleteTask}){ //Hierarchie

  const [task, setTask] = useState([]);
  const navigation = useNavigation();

  const callback = (token, id) => {
    getTask(token,id).then(rep =>{
      setTask(rep.tasks[0]);
    })
  }

  useEffect(()=> {
    callback(token, id)
  }, [token, id])

  useEffect(() => {
    //setTask(task => task.filter(t => t.id !== id));
  }, [id])

  return(
    <View>
      {hierarchy === "ProjectChef" ? (
        <><Button
          title="Supprimer cette Task"
          onPress={() => {
            deleteTask(id, token).then(response => {
              setTask(task.filter(t => t.id !== id)); //???
              onDeleteTask(id);
              // Revenir à l'écran précédent une fois le projet supprimé
              navigation.goBack();
            });
          } } /><Button
            title="Modifier cette Task"
            onPress={() => {
              navigation.navigate("ModificationTask", {
                task:task,
              });
            }}/></>
      ) : []}
      
      <Text>Description : </Text>
      <Text>{task?.description}</Text>
    </View>
  )
}