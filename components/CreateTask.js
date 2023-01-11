import React,{useEffect, useState} from "react";

import { StyleSheet, View, SafeAreaView} from 'react-native';

import { TextInput, Button,Text} from 'react-native-paper';

import AwesomeAlert from 'react-native-awesome-alerts';

import { useNavigation } from "@react-navigation/native";

import { createTask } from "../API/todoAPI"
import Logo from '../images/undraw_add_tasks_re_s5yj.svg';

//<Checkbox value={item.done} onValueChange={setStatusTask}/>

export default function CreateTask({username,token,idProject,titleProject}){

  const [taskContent, setTaskContent] = useState("");
  const [description, onChangeDescription] = useState("");
  const [disabled, setDisabled] = useState(true)
  const [showable,setShowable] = useState(false)

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
        <Text variant="displaySmall" style={{marginTop:15,marginLeft:15, color:"#01796f"}}>Nouvelle tâche pour {titleProject}</Text>
          <View style={{marginTop:"5%", alignItems:"center"}}>
            <Logo width={200} height={150} />
          </View>
        <TextInput
          style={{marginTop:15,marginHorizontal:15,textAlign:"center"}}
          label="Titre de la tâche"
          mode="outlined"
          cursorColor="#01796f"
          outlineColor="#01796f"
          textColor="#01796f"
          activeOutlineColor="#01796f"
          onChangeText={setTaskContent}
          value={taskContent}
        />

        <TextInput
          style={{marginTop:15,marginHorizontal:15,textAlign:"center"}}
          label="Description de la tâche"
          mode="outlined"
          cursorColor="#01796f"
          outlineColor="#01796f"
          textColor="#01796f"
          activeOutlineColor="#01796f"
          onChangeText={onChangeDescription}
          value={description}
        />
        <AwesomeAlert
          show={showable}
          title={taskContent}
          message="Etes-vous sur de vouloir créer ce projet ?"
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Annuler"
          confirmText="Confirmer"
          confirmButtonColor="#90D7B4"
          cancelButtonColor="#01796f"
          onCancelPressed={() => {
            setShowable(false);
          }}
          onConfirmPressed={() => {
            createTask(idProject,token,taskContent,description).then(navigation.goBack())  
          }}
        />
          
      {disabled ? (
          <Button style={{marginHorizontal:35,marginTop:15}} disabled={disabled} icon="alert" mode="contained">
            Tout les champs ne sont pas remplis...
          </Button>) : (
          <Button style={{marginHorizontal:35,marginTop:15}} labelStyle={{color: '#22577A'}} buttonColor='#90D7B4' icon="checkbox-marked" mode="contained" onPress={() => setShowable(true)}>
            <Text style={{color: '#22577A',fontWeight:"bold",textTransform: 'uppercase'}}> Creer {taskContent}</Text>
          </Button>)}
      </SafeAreaView>


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
