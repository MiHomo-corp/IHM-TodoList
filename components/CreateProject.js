import React,{useEffect, useState} from "react";
import { View, ScrollView, useWindowDimensions, LogBox } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from 'react-native-awesome-alerts';
import { Calendar } from 'react-native-calendars';
import { Button, TextInput,Text } from 'react-native-paper';

import { createProject } from "../API/todoAPI"
import Logo from '../images/createProject.svg';


export default function CreateProject({username,token,onHandleNewProject}){

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const {height, width} = useWindowDimensions();
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
    if(projectTitle === "" || dateProject === "" ||  description === ""){
      setDiasbled(true)
    }
    else{
      setDiasbled(false)
    }
  })

  return(
    <ScrollView>
      <View>
          <Text variant="displaySmall" style={{marginTop:15,marginLeft:15, color:"#01796f"}}>Nouveau Projet</Text>
            <View style={{marginTop:"5%", alignItems:"center"}}>
              <Logo width={width/1.5} height={height/6} />
            </View>
            <TextInput
              style={{marginVertical:15,marginHorizontal:15,textAlign:"center"}}
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
              style={{marginHorizontal:15,marginVertical:15}}
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
              createProject(username,token,projectTitle,dateProject,description).then((response)=>{
                onHandleNewProject(response.createProjects.projects[0]);
                navigation.goBack() 
              })
            }}
          />
          {disabled ? (
            <Button 
              style={{marginHorizontal:35,marginVertical:50}}
              disabled={disabled} 
              icon="alert" 
              mode="contained">
              Tout les champs ne sont pas remplis...
            </Button>) : (
            <Button 
              style={{marginHorizontal:35,marginVertical:50}} 
              labelStyle={{color: '#22577A'}} 
              buttonColor='#90D7B4' 
              icon="briefcase-plus" 
              mode="contained" 
              onPress={() => setShowable(true)}>
              <Text style={{color: '#22577A',fontWeight:"bold",textTransform: 'uppercase'}}> Creer {projectTitle}</Text>
            </Button>)}
      </View>
    </ScrollView>
  )
}