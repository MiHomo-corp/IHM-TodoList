import React,{useEffect, useState} from "react";

import { StyleSheet, View, TextInput, Button, Text, SafeAreaView, componentWillMount} from 'react-native';

import { useNavigation } from "@react-navigation/native";

import { updateTask } from "../API/todoAPI"

//<Checkbox value={item.done} onValueChange={setStatusTask}/>

export default function ModificationTask({token,task}){
  const [taskContent, onChangeText] = useState(task.content);
  const [description, onChangeDescription] = useState(task.description);
  const [diasbled, setDiasbled] = useState(true)
  const navigation = useNavigation();

  useEffect(() => {
    if(taskContent === task.content && description === task.description){
      setDiasbled(true)
    }
    else{
      setDiasbled(false)
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
       
        <Text>Description de la tâche</Text>
        <TextInput
          onChangeText={onChangeDescription}
          value={description === null ? "" : description}
        />
      </SafeAreaView>
      <Button 
        disabled={diasbled}
        title={"Modification de "+taskContent}
        onPress={()=>updateTask(token,task.id,taskContent,description).then(navigation.navigate("TodoLists"))}
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
