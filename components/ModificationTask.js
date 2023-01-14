import React,{useEffect, useState} from "react";

import { StyleSheet, View, SafeAreaView, componentWillMount} from 'react-native';

import { Button, TextInput,Text } from 'react-native-paper';

import AwesomeAlert from 'react-native-awesome-alerts';

import { useNavigation } from "@react-navigation/native";

import { updateTask } from "../API/todoAPI"
import Logo from '../images/modifTask.svg';


export default function ModificationTask({token,task}){
  const [taskContent, onChangeText] = useState(task.content);
  const [description, onChangeDescription] = useState(task.description);
  const [disabled, setDisabled] = useState(true)
  const [showable,setShowable] = useState(false)
  const navigation = useNavigation();

  useEffect(() => {
    if(taskContent === task.content && description === task.description){
      setDisabled(true)
    }
    else{
      setDisabled(false)
    }
  })

  return(
    <View>
      <SafeAreaView>
        <Text variant="displaySmall" style={{marginTop:15,marginLeft:15, color:"#01796f"}}>Modification de {task.content}</Text>
        <View style={{marginTop:"5%", alignItems:"center"}}>
          <Logo width={200} height={150} />
        </View>
        <TextInput
          style={{marginTop:15,marginHorizontal:15,textAlign:"center"}}
          label="Nom de la tâche"
          mode="outlined"
          cursorColor="#01796f"
          outlineColor="#01796f"
          textColor="#01796f"
          activeOutlineColor="#01796f"
          onChangeText={onChangeText}
          value={taskContent}
        />
        <TextInput
          style={{marginTop:15,marginHorizontal:15,textAlign:"center"}}
          label="Description"
          mode="outlined"
          cursorColor="#01796f"
          outlineColor="#01796f"
          textColor="#01796f"
          activeOutlineColor="#01796f"
          onChangeText={onChangeDescription}
          value={description === null ? "" : description}
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
            updateTask(token,task.id,taskContent,description).then(navigation.navigate("TodoLists"))
          }}
        />
        {disabled ? (
          <Button style={{marginHorizontal:35,marginTop:15}} disabled={disabled} icon="alert" mode="contained">
            Aucune modification détecté
          </Button>) : (
          <Button style={{marginHorizontal:35,marginTop:15}} labelStyle={{color: '#22577A'}} buttonColor='#90D7B4' icon="checkbox-marked" mode="contained" onPress={() => setShowable(true)}>
            <Text style={{color: '#22577A',fontWeight:"bold",textTransform: 'uppercase'}}> Modifier {taskContent}</Text>
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
