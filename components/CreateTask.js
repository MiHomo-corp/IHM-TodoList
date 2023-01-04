import React,{useEffect, useState} from "react";

import { StyleSheet, View, TextInput, Button, Text, SafeAreaView} from 'react-native';

import { useNavigation } from "@react-navigation/native";

import { createTask } from "../API/todoAPI"

//<Checkbox value={item.done} onValueChange={setStatusTask}/>

export default function CreateTask({username,token}){

  const [taskContent, onChangeText] = useState("");
  const [description, onChangeDescription] = useState("");
  const [disabled, setDisabled] = useState(true)

  //const [newTodoText, setNewTodoText] = useState("");
  const navigation = useNavigation();
  
  useEffect(() => {
    if(taskContent === "" || description === ""){
      setDisabled(true)
    }
    else{
      setDisabled(false)
    }
  })

  return(
    <View>
      <SafeAreaView>
        <Text>Titre de la tâche</Text>
        <TextInput
          onChangeText={onChangeText}
          value={taskContent}
        />

        <Text>Description de la task</Text>
        <TextInput
          onChangeText={onChangeDescription}
          value={description}
        />
      </SafeAreaView>
      <Button 
        disabled={disabled}
        title={"Création de "+taskContent}
        onPress={()=>createTask(username,token,taskContent,description).then(navigation.goBack())}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    width: 70
  },
  text_error: {
    color: 'red'
  },
  text_input: {
    backgroundColor: 'white',
    margin: 5
  }
})
