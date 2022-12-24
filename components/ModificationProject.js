import React,{useEffect, useState} from "react";

import { StyleSheet, View, TextInput, Button, Text, SafeAreaView, componentWillMount} from 'react-native';

import { useNavigation } from "@react-navigation/native";

import { updateTaskList } from "../API/todoAPI"

//<Checkbox value={item.done} onValueChange={setStatusTask}/>

export default function ModificationProject({token,project}){
  const [projectTitle, onChangeText] = useState(project[0].title);
  const [description, onChangeDescription] = useState(project[0].description);
  const [dateProject, onChangeDateProject] = useState(project[0].date)
  const [diasbled, setDiasbled] = useState(true)
  const navigation = useNavigation();

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();

  useEffect(() => {
    if(projectTitle === project[0].title && dateProject === project[0].date && description === project[0].description){
      setDiasbled(true)
    }
    else{
      setDiasbled(false)
    }
  })

  return(
    <View>
      <Button title="Go back" onPress={() => navigation.goBack()} />
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
        title={"Modification de "+projectTitle}
        onPress={()=>updateTaskList(token,project[0].id,projectTitle,dateProject,description).then(navigation.navigate("TodoLists"))}
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
