import React,{useEffect, useState} from "react";

import { StyleSheet,Keyboard, View, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { useNavigation } from "@react-navigation/native";

import AwesomeAlert from 'react-native-awesome-alerts';

import { Button, TextInput,Text } from 'react-native-paper';

import { createTaskList } from "../API/todoAPI"

import { Calendar } from 'react-native-calendars';

//<Checkbox value={item.done} onValueChange={setStatusTask}/>

export default function CreationProject({username,token}){

  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateProject, setDateProject] = useState("")
  const [disabled, setDiasbled] = useState(true)
  const [showable,setShowable] = useState(false)

  const navigation = useNavigation()

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth()+1;
  const year = date.getFullYear();
  if(day<10) day="0"+day;
  if(month<10) month="0"+month;
  const currentDate = ''+year+'-'+month+'-'+day

  const handleDayPress = (day) => {
    setDateProject(day.dateString);
  }    

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
        <Text variant="displaySmall" style={{marginTop:15,marginLeft:15, color:"#01796f"}}>Nouveau Projet</Text>
          <TextInput
            style={{marginTop:15,marginHorizontal:15,textAlign:"center"}}
            label="Nom du Projet"
            mode="outlined"
            cursorColor="#01796f"
            outlineColor="#01796f"
            textColor="#01796f"
            activeOutlineColor="#01796f"
            onChangeText={setProjectTitle}
            value={projectTitle}
          />
          <Text variant="titleMedium" style={{marginTop:15,marginLeft:15, color:"#01796f"}}>Date de fin</Text>
          <Calendar
            style={{marginHorizontal:15,marginTop:15}}
            onDayPress={handleDayPress}
            minDate={currentDate}
            markedDates={{
              [dateProject] : {selected: true, selectedColor:"#90D7B4"},
              [currentDate] : {marked:true, dotColor:'#01796f'}
            }}
            theme={{
              backgroundColor:"#EBF7F3",
              arrowColor: '#01796f',
              todayTextColor: '#01796f',
              dayTextColor: '#01796f',
              selectedDayTextColor: '#22577A',
              monthTextColor: '#01796f',
              textSectionTitleColor: '#01796f',
            }}
          />
          <TextInput
            style={{marginHorizontal:15,marginTop:15 ,textAlign:"center"}}
            mode="outlined"
            label="Description du Projet"
            outlineColor="#01796f"
            activeOutlineColor="#01796f"
            textColor="#01796f"
            onChangeText={setDescription}
            value={description}
          />

        <AwesomeAlert
          show={showable}
          title={projectTitle}
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
            createTaskList(username,token,projectTitle,dateProject,description).then(navigation.navigate("TodoLists"))  
          }}
        />
        {disabled ? (
          <Button style={{marginHorizontal:35,marginTop:15}} disabled={disabled} icon="alert" mode="contained">
            Tout les champs ne sont pas remplis...
          </Button>) : (<Button style={{marginHorizontal:35,marginTop:15}} labelStyle={{color: '#22577A'}} buttonColor='#90D7B4' icon="briefcase-plus" mode="contained" onPress={() => setShowable(true)}>
          <Text style={{color: '#22577A',fontWeight:"bold",textTransform: 'uppercase'}}> Creer {projectTitle}</Text>
          </Button>)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

/*
createTaskList(username,token,projectTitle,dateProject,description).then(navigation.navigate("TodoLists"))  
*/