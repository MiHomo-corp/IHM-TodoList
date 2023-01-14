import React,{useEffect, useState} from "react";

import { StyleSheet, View, SafeAreaView,ScrollView} from 'react-native';

import { useNavigation } from "@react-navigation/native";

import { Button, TextInput,Text } from 'react-native-paper';

import AwesomeAlert from 'react-native-awesome-alerts';

import { updateProject } from "../API/todoAPI"
import { Calendar } from 'react-native-calendars';

import Logo from '../images/modifProject.svg';


export default function ModificationProject({token,project}){
  const [projectTitle, setProjectTitle] = useState(project[0].title);
  const [description, setDescription] = useState(project[0].description);
  const [dateProject, setDateProject] = useState(project[0].date)
  const [disabled, setDisabled] = useState(true)
  const [showable,setShowable] = useState(false)

  const navigation = useNavigation();

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
    if(projectTitle === project[0].title && dateProject === project[0].date && description === project[0].description){
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
          <Text variant="displaySmall" style={{marginTop:15,marginLeft:15, color:"#01796f"}}>Modification du projet {project[0].title}</Text>
            <View style={{marginTop:"5%", alignItems:"center"}}>
              <Logo width={200} height={150} />
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
            title={project[0].title}
            message="Etes-vous sur de vouloir modifier ce projet ?"
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
              updateProject(token,project[0].id,projectTitle,dateProject,description).then(navigation.navigate("Projects")) 
         }}
          />
          {disabled ? (
            <Button style={{marginHorizontal:35,marginVertical:50}} disabled={disabled} icon="alert" mode="contained">
              Aucune modification détecté
            </Button>) : (
            <Button style={{marginHorizontal:35,marginVertical:50}} labelStyle={{color: '#22577A'}} buttonColor='#90D7B4' icon="briefcase-edit" mode="contained" onPress={() => setShowable(true)}>
              <Text style={{color: '#22577A',fontWeight:"bold",textTransform: 'uppercase'}}> Modifier {projectTitle}</Text>
            </Button>)}
        </SafeAreaView>
      </ScrollView>
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
