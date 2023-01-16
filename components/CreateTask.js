import React,{useEffect, useState} from "react";
import { View, SafeAreaView,ScrollView,useWindowDimensions} from 'react-native';
import { TextInput, Button,Text} from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNavigation } from "@react-navigation/native";

import { createTask } from "../API/todoAPI"
import Logo from '../images/createTask.svg';


export default function CreateTask({token,idProject,titleProject,onHandleNewTask}){
 
  const {height, width} = useWindowDimensions();
  const [taskContent, setTaskContent] = useState("");
  const [description, onChangeDescription] = useState("");
  const [disabled, setDisabled] = useState(true)
  const [showable,setShowable] = useState(false)

  const navigation = useNavigation();
  
  useEffect(() => {
    if(taskContent === ""){
      setDisabled(true)
    }
    else{
      setDisabled(false)
    }
  })

  return(
    <View>
      <ScrollView>
        <SafeAreaView>
          <Text variant="displaySmall" style={{marginTop:15,marginLeft:15, color:"#01796f"}}>Nouvelle tâche pour {titleProject}</Text>
            <View style={{marginTop:"5%", alignItems:"center"}}>
              <Logo width={width/1.5} height={height/6} />
            </View>
          <TextInput
            maxLength={20}
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
            multiline={true}
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
            message="Etes-vous sur de vouloir créer cette tâche ?"
            showCancelButton={true}
            showConfirmButton={true}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            cancelText="Annuler"
            confirmText="Confirmer"
            confirmButtonColor="#90D7B4"
            cancelButtonColor="#01796f"
            onCancelPressed={() => {
              setShowable(false);
            }}
            onConfirmPressed={() => {
              createTask(idProject, token, taskContent, description).then((response) => {
                onHandleNewTask(response.createTasks.tasks[0]);
                navigation.goBack();
              });
            }}
          />
            
        {disabled ? (
            <Button 
              style={{marginHorizontal:35,marginTop:35}} 
              disabled={disabled} 
              icon="alert" 
              mode="contained">
              Tout les champs ne sont pas remplis...
            </Button>) : (
            <Button 
              style={{marginHorizontal:35,marginTop:35}} 
              labelStyle={{color: '#22577A'}} 
              buttonColor='#90D7B4' 
              icon="checkbox-marked" 
              mode="contained" 
              onPress={() => setShowable(true)}>
              <Text style={{color: '#22577A',fontWeight:"bold",textTransform: 'uppercase'}}> Creer {taskContent}</Text>
            </Button>)}
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}
