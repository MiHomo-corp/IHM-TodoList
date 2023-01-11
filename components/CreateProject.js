import React,{useEffect, useState} from "react";

import { StyleSheet, View, TextInput, Button, Text, SafeAreaView} from 'react-native';

import { useNavigation } from "@react-navigation/native";

import { createTaskList } from "../API/todoAPI"

//<Checkbox value={item.done} onValueChange={setStatusTask}/>

export default function CreationProject({username,token}){

  const [projectTitle, onChangeText] = useState("");
  const [description, onChangeDescription] = useState("");
  const [dateProject, onChangeDateProject] = useState("")
  const [diasbled, setDiasbled] = useState(true)

  const navigation = useNavigation()

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
      <View style={{justifyContent:'center',alignItems:'center',flexDirection:"row",paddingTop:50}}>
        <SafeAreaView>
          <Text style={styles.label}>Titre du projet</Text>
          <Text style={styles.label}>Date de fin</Text>
          <Text style={styles.label}>Description du projet</Text>
        </SafeAreaView>
        <SafeAreaView>
          <TextInput
            style={styles.text_input}
            onChangeText={onChangeText}
            value={projectTitle}
          />
          <TextInput 
            style={styles.text_input}
            type="date" 
            value={dateProject} 
            min={year+"-"+month+"-"+day}
            onChange={d => onChangeDateProject(d.target.value)}
          />
          <TextInput
            style={styles.text_input}
            onChangeText={onChangeDescription}
            value={description}
          />
        </SafeAreaView>
      </View>
      <View>
        <Button 
          disabled={diasbled}
          title={"Création de "+projectTitle}
          onPress={()=>createTaskList(username,token,projectTitle,dateProject,description).then(navigation.navigate("TodoLists"))}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#90D7B4',
    width:300,
    height:40,
    marginTop:25,
    marginBottom:10,
    elevation:1
  },
  buttonText:{
    color:'#22577A',
    fontSize:18,
    fontWeight:"bold",
  },
  label: {
    marginTop:10,
    marginBottom:15,
    textAlign: 'right',
    minWidth: 70,
    marginRight:2
  },
  text_error: {
    color: 'red'
  },
  text_input: {
    backgroundColor: 'white',
    margin: 10,
    width:200,
    height:30,
    borderWidth:1,
    borderColor:"gray",
    elevation:5
  }
})
