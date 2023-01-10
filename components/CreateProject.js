import React,{useEffect, useState} from "react";

import { StyleSheet, View, TextInput, Text, SafeAreaView} from 'react-native';

import { useNavigation } from "@react-navigation/native";

import AwesomeAlert from 'react-native-awesome-alerts';

import { Button } from 'react-native-paper';

import { createTaskList } from "../API/todoAPI"

import { Calendar } from 'react-native-calendars';

//<Checkbox value={item.done} onValueChange={setStatusTask}/>

export default function CreationProject({username,token}){

  const [projectTitle, onChangeText] = useState("");
  const [description, onChangeDescription] = useState("");
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
      <SafeAreaView>
        <Text>Titre du projet</Text>
        <TextInput
          onChangeText={onChangeText}
          value={projectTitle}
        />
        <Text>Date de fin</Text>
        <Calendar
          onDayPress={handleDayPress}
          minDate={currentDate}
          markedDates={{
            [dateProject] : {selected: true, selectedColor:"#90D7B4"},
            [currentDate] : {marked:true, dotColor:'#01796f'}
          }}
          theme={{
            arrowColor: '#01796f',
            todayTextColor: '#01796f',
            dayTextColor: '#01796f',
            selectedDayTextColor: '#22577A',
            monthTextColor: '#01796f',
            textSectionTitleColor: '#01796f',
          }}
        />
        <Text>Description du projet</Text>

        <TextInput
          onChangeText={onChangeDescription}
          value={description}
        />
      </SafeAreaView>

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
          setShowable(false);
        }}
      />
      {disabled ? (
      <Button disabled={disabled} icon="alert" mode="contained" onPress={() => setShowable(true)}>
        Tout les champs ne sont pas remplis...
      </Button>) : (<Button labelStyle={{color: '#22577A'}} buttonColor='#90D7B4' icon="briefcase-plus" mode="contained" onPress={() => setShowable(true)}>
       <Text style={{textTransform: 'uppercase'}}> Creer {projectTitle}</Text>
      </Button>)}
      
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

/*
createTaskList(username,token,projectTitle,dateProject,description).then(navigation.navigate("TodoLists"))  
*/