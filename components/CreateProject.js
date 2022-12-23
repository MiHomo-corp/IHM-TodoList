import React,{useEffect, useState} from "react";

import { StyleSheet, View, TextInput, Button, Text, SafeAreaView} from 'react-native';

//import { useNavigation } from "@react-navigation/native";

import { createTaskList } from "../API/todoAPI"

//<Checkbox value={item.done} onValueChange={setStatusTask}/>

export default function CreationProject({username,token}){

  const [projectTitle, onChangeText] = useState("");
  const [description, onChangeDescription] = useState("");
  const [dateProject, onChangeDateProject] = useState("")
  const [diasbled, setDiasbled] = useState(true)
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();

  //const [newTodoText, setNewTodoText] = useState("");
  //const navigation = useNavigation();
  
  useEffect(() => {
    if(projectTitle === "" || dateProject === ""){
      setDiasbled(true)
    }
    else{
      setDiasbled(false)
    }
  })

  return(
    <View>
      <SafeAreaView>
        <Text>Titre du projet</Text>
        <TextInput
          onChangeText={onChangeText}
          value={projectTitle}
        />
        <Text>Date de fin</Text>
        <input 
          type="date" 
          value={dateProject} 
          min={year+"-"+month+"-"+day}
          onChange={d => onChangeDateProject(d.target.value)}/>

        <Text>Description du projet</Text>

        <TextInput
          onChangeText={onChangeDescription}
          value={description}
        />
      </SafeAreaView>
      <Button 
        disabled={diasbled}
        title={"Création de "+projectTitle}
        onPress={()=>createTaskList(username,token,projectTitle,dateProject,description).then(console.log("test"))}
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
