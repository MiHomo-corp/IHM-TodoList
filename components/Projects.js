import React,{useEffect, useState} from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView,useWindowDimensions} from 'react-native';
import { Text, Button } from 'react-native-paper'
import { useNavigation } from "@react-navigation/native";

import { getChefsOfManager, getProjects } from "../API/todoAPI"

export default function Projects({hierarchy,username,token}){
  const {height, width} = useWindowDimensions();
  const [todos, setTodos] = useState([]);
  const navigation = useNavigation();
  
  const callback = (hierarchy, username, token) => {
      if(hierarchy === "Manager"){
        let usernameInArray = []
        getChefsOfManager(username,token).then(projectChefs => {
          projectChefs.forEach(element => {
            usernameInArray.push(element.username)
          })
        }).then(() => getProjects(usernameInArray,token).then(project =>{
          setTodos(project)
        }))
      }
      else{
        getProjects([username],token).then(project =>{
          setTodos(project)
        })
      }
  }

  const handleNextStepProject = (updatedProject) => {
    setTodos(todos.map(project => project.id === updatedProject.id ? updatedProject : project));
  }

  const handleDeleteProject = (todosId) => {
    setTodos(todos => todos.filter(t => t.id !== todosId));
  };

  const handleNewProject = (newProject) => {
    setTodos([...todos, newProject]);
  }

  const handleModificationProject = (updatedProject) => {
    setTodos(todos.map(project => project.id === updatedProject.id ? updatedProject : project));
  }

  useEffect(()=> {
    callback(hierarchy,username, token)
  },[])

  return(
    <>
      <ScrollView>
        {hierarchy === "ProjectChef" ? (
          <View style={{marginTop:height/50, marginRight:width/15, alignItems:"flex-end"}}>
          <Button
            labelStyle={{color: '#22577A',fontWeight:"bold"}}
            buttonColor='#90D7B4'
            mode="contained"
            icon="briefcase-plus"
            style={{width:width/2.2}}
            onPress={() => 
              navigation.navigate("CreateProject",{
                onHandleNewProject:handleNewProject,
                coucou:"test"
            })}>CREER PROJET</Button></View>) : []}
          
          <View style={{marginTop:height/50,  flex: 1, position: 'relative'}}>
            {todos.map((item)=> 
              <View key={item.id} style={ hierarchy  === "Manager" && item.projectStepDone ? styles.listAction : styles.list}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity 
                    onPress={() => {
                      navigation.push("TodoList", {
                        id: item.id,
                        onModificationProject:handleModificationProject,
                        onDeleteProject:handleDeleteProject,
                        onNextStepProject:handleNextStepProject
                      });
                    } } style={{width:"100%"}}>
                    <View flexDirection="row">
                    <Text variant="headlineSmall" style={styles.title}> {item.title}
                    {hierarchy === "Manager" ?(
                      <>
                        <Text variant="labelLarge" style={styles.author}>   par {item.owner.username}</Text>
                      </>
                    ):[]}</Text>
                    </View>
                    <View flexDirection="row">
                      <View style={styles.container}>
                        <Text variant="labelLarge" style={styles.label}>Statut : </Text>
                        <Text variant="labelLarge" style={styles.label}>Date de fin :</Text>
                      </View>
                      <View style={[styles.container]}>
                        <Text variant="bodyMedium" style={styles.text}>{item.status}</Text>
                        <Text variant="bodyMedium" style={styles.text}>{item.date}</Text>
                      </View>
                    </View>
                    {hierarchy  === "Manager" && item.projectStepDone ? (
                      <Text variant="bodyLarge" style={{fontWeight:"bold",textAlign:"right", marginHorizontal:20,marginTop:5, color:"#B22222"}}>ACTION REQUISE</Text>
                    ):[]}
                    <View style={{borderBottomColor:"gray",borderBottomWidth:1,width: '100%',padding:5,opacity:0.33}}/>
                  </TouchableOpacity>
                </View>
              </View>)}
          </View>
        <View style={{marginTop:"10%", alignItems:"center"}}>
        </View>
      </ScrollView>
    </>    
  )
}

const styles = StyleSheet.create({
  list:{
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 10,
    paddingLeft:0,
    marginLeft:0
  },
  listAction:{
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 10,
    paddingLeft:0,
    marginLeft:0,
    backgroundColor:"#f8d4d4"
  },
  title:{
    marginLeft:20,
    fontWeight:"bold",
    color:"#01796F",
    textAlign:"left",
    paddingBottom:10,
    paddingTop:5
  },
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
  author:{
    fontStyle:"italic",
    color:"#01796F",
    marginTop:20
  },
  buttonText:{
    color:'#22577A',
    fontSize:18,
    fontWeight:"bold",
  },
  label: {
    paddingRight:10,
    color:"#22577A",
    fontWeight:"bold",
    width:150,
    textAlign:"right"
  },
  text: {
    paddingLeft:50,
    width:190,
    textAlign:"left",
    color:"#01796F",
    fontWeight:"bold"
  },
  text_error: {
    color: 'red'
  },
  container: {
    alignItems:"center",
    flexDirection:"column",
  }
})