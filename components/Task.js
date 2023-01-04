import React,{useEffect, useState} from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch, TouchableOpacity, Checkbox } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getTask , deleteTask } from "../API/todoAPI"

export default function Task({token,title,id,onDeleteTask}){
  const [task, setTask] = useState([]);
  const navigation = useNavigation();

  const callback = (token, title, id) => {
    getTask(token,title,id).then(rep =>{
      setTask(rep.tasks);
    })
  }

  useEffect(()=> {
    callback(token, title, id)
  }, [token, title, id])

  useEffect(() => {
    setTask(task => task.filter(t => t.id !== id));
  }, [id])


  return(
    <View>
      <Text>{task[0]?.content}</Text>
      <Button
            title="Supprimer ce projet"
            onPress={() => {
              deleteTask(id, token).then(response => {
                setTask(task.filter(t => t.id !== id));
                onDeleteTask(id);
                // Revenir à l'écran précédent une fois le projet supprimé
                navigation.goBack();
              })}
            }/>
      <Text>Description : </Text>
      <Text>{task[0]?.description}</Text>
    </View>
  )
}