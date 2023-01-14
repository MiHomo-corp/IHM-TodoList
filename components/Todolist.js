import React,{useEffect, useState} from "react";

import { StyleSheet, View, TouchableOpacity, useWindowDimensions,ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper'
import AwesomeAlert from 'react-native-awesome-alerts';
import Checkbox from 'expo-checkbox';

import { useNavigation } from "@react-navigation/native";
import { getTasks, setCheckTask, closeProject, deleteProject, deleteTask, updateProjectStepDone, nextStepProject } from "../API/todoAPI"


export default function TodoList({hierarchy,username,token,title,id,usernameOfOwner, onDeleteTaskList}){
  const {height, width} = useWindowDimensions();
  const [tasks, setTask] = useState([]);
  const [project, setProject] = useState([]);
  const navigation = useNavigation();
  const [deleteShowable,setDeleteShowable] = useState(false)
  const [closeShowable,setCloseShowable] = useState(false)
  const [validationShowable,setValidationShowable] = useState(false)
  const [cancelShowable,setCancelShowable] = useState(false)

  // Fonction de gestion d'événement qui sera appelée lorsque la valeur de la checkbox change
  const handleChange = (item) => {
    setCheckTask(item.id, token, !item.done)
    .then((response) => {
      // Mise à jour de la valeur de "item.done" dans la liste de tâches
      const updatedTasks = tasks.map((task) => {
        if (task.id === item.id) {
          return { ...task, done: !task.done };
        }
        return task;
      });
      setTask(updatedTasks);
    });
  };
  const verifDoneTask = ()=> {
    for(let element of tasks){
      if(!element.done){
        return false
      }
    }
    return true
  }

  const getNextStepProject = () => {
    if(project[0]?.status === "Initialisation")
      return "Développement"
    if(project[0]?.status === "Developpement")
      return "Mise en production"
    return "Terminé"    
  }

  const callback = (username, token, title,usernameOfOwner) => {
    getTasks(usernameOfOwner,token,title).then(rep =>{
      setTask(rep.tasks);
      setProject(rep.projects);
    })
  }

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId, token).then((response) => {
      // Mettre à jour la liste de tâches en filtrant les tâches qui ont l'identifiant de la tâche supprimée
      setTask(tasks.filter((task) => task.id !== taskId));
    });
  };

  useEffect(()=> {
    callback(username, token, title,usernameOfOwner)
  }, [username, token, title,usernameOfOwner])

  return(
    <ScrollView>
        <View>
          {hierarchy === "Manager" ?(
            <>
              <Text variant="headlineLarge" style={styles.title}>{project[0]?.title} </Text>
              <Text variant="labelLarge" style={styles.subtitle}>par {usernameOfOwner}</Text>
            </>
          ):[]}
          {hierarchy === "ProjectChef" ?(
            <>
              <Text variant="headlineLarge" style={styles.title}>{project[0]?.title} </Text>
            </>
          ):[]}
          <View style={{borderBottomColor:"gray",borderBottomWidth:1,width: '100%',padding:5,opacity:0.33}}/>
          <Text variant="titleSmall" style={styles.status}>Status : {project[0]?.status}</Text>

          {hierarchy === "ProjectChef" && verifDoneTask() && project[0]?.status !== "Terminé" ? (
            <>
              <View style={{alignItems:"center",marginTop:10,marginBottom:10}}>
                <Button
                  style={{width:350}}
                  labelStyle={!project[0]?.projectStepDone? {color: '#22577A',fontWeight:"bold"}:{}}
                  buttonColor='#90D7B4'
                  mode="contained"
                  disabled = {project[0]?.projectStepDone}
                  onPress={() => updateProjectStepDone(project[0].id, token).then(navigation.navigate("Projects"))}>
                    {project[0]?.projectStepDone ? "Demande de validation en cours..." : "DEMMANDE DE VALIDATION ETAPE"}
                </Button>
              </View>
            </>
          ) : []}

          {hierarchy === "Manager" && project[0]?.projectStepDone && project[0]?.status !== "Terminé" ? (
            <>
              <AwesomeAlert
                show={validationShowable}
                title="VALIDER"
                message={"Etes-vous sur de vouloir valider cette étape du projet et de passer à la suivante ("+getNextStepProject()+") ? Vous ne pourrez pas revenir en arrière !"}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Annuler"
                confirmText="Confirmer"
                confirmButtonColor="#90D7B4"
                cancelButtonColor="#01796f"
                onCancelPressed={() => {
                  setValidationShowable(false);
                } }
                onConfirmPressed={() => {
                  nextStepProject(true,project[0].id,project[0].status, token).then(navigation.navigate("Projects"));
                } } />
              <AwesomeAlert
                show={cancelShowable}
                title="REFUSER"
                message={"Etes-vous sur de vouloir refuser la validation de l'étape "+project[0].status+" de ce projet ?"}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Annuler"
                confirmText="Confirmer"
                confirmButtonColor="#B22222"
                cancelButtonColor="#01796f"
                onCancelPressed={() => {
                  setCancelShowable(false);
                } }
                onConfirmPressed={() => {
                  nextStepProject(false,project[0].id,project[0].status, token).then(navigation.navigate("Projects"));
                } } />
              <View style={{flexDirection:"row",padding:5}}>
                <Button
                  style={styles.button}
                  labelStyle={{color: '#22577A',fontWeight:"bold",textTransform:"uppercase"}}
                  buttonColor='#90D7B4'
                  mode="contained"
                  onPress={() => setValidationShowable(true)} >
                    Valider étape
                </Button>
                <Button
                  style={styles.button}
                  labelStyle={{color: '#EBF7F3',fontWeight:"bold",textTransform:"uppercase"}}
                  buttonColor='#B22222'
                  mode="contained"
                  onPress={() => setCancelShowable(true)}>
                    Refuser étape
                </Button>
              </View>
            </>
          ) : []}
          <View style={{ paddingLeft: 10, paddingTop:20}}>
          {tasks.map((item) => 
            <View style={{marginLeft:width/5, flexDirection: 'row', alignItems:"center"}}>
            <Checkbox 
              disabled={project[0]?.projectStepDone || project[0]?.status === "Fermé" || project[0]?.status === "Terminé"} 
              value={item.done} style={styles.checkbox} 
              onValueChange={() => handleChange(item)} />

            <TouchableOpacity onPress={() => {
              navigation.setOptions({
                onDeleteTask:handleDeleteTask
              })
              navigation.navigate("Task", {
                title: item.content,
                id: item.id,
                token: token,
              });
            }}>
              <Text style={styles.label}>{item.content}</Text>
              
            </TouchableOpacity>
          </View>
          )}
        </View>
          {project[0]?.status !== "Fermé" && project[0]?.status !== "Terminé" ? (
            <View style={{alignItems:"center",marginTop:30}}>
              {project[0]?.projectStepDone ? (
                 <Button
                 style={{width:250,height:50,justifyContent:"center"}}
                 disabled={true}
                 mode="contained"
                 icon="plus-box"
                 >NOUVELLE TÂCHE</Button>
              ) : (
                <Button
                style={{width:250,height:50,justifyContent:"center"}}
                labelStyle={{color: '#22577A',fontWeight:"bold"}}
                buttonColor='#90D7B4'
                mode="contained"
                icon="plus-box"
                onPress={() => {
                  navigation.navigate("CreateTask", {
                    titleProject: project[0].title,
                    idProject: project[0].id
                  });
                }} >NOUVELLE TÂCHE</Button>
              )}
            </View>
          ) : []}

          {hierarchy === "ProjectChef" && (project[0]?.status === "Fermé" || project[0]?.status === "Terminé") ? (
            <>
              <AwesomeAlert
                show={deleteShowable}
                title="ATTENTION"
                message="Etes-vous sur de vouloir suprimer ce projet ? Cette action est irrémédiable !"
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Annuler"
                confirmText="Confirmer"
                confirmButtonColor="#B22222"
                cancelButtonColor="#01796f"
                onCancelPressed={() => {
                  setDeleteShowable(false);
                } }
                onConfirmPressed={() => {
                  deleteProject(project[0].id, token).then(navigation.navigate("Projects"));
                } } />
              <Button
                style={{ width: 250, margin: 50 }}
                icon="delete"
                labelStyle={{ color: '#EBF7F3', fontWeight: "bold", textTransform: "uppercase" }}
                buttonColor='#B22222'
                mode="contained"
                onPress={() => setDeleteShowable(true)}>Supprimer projet</Button></>
            ) : []}

          {hierarchy === "Manager" && project[0]?.status !== "Fermé" ? (
            <>
              <AwesomeAlert
                show={closeShowable}
                title="ATTENTION"
                message="Etes-vous sur de vouloir fermer ce projet ? Cette action est irrémédiable !"
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Annuler"
                confirmText="Confirmer"
                confirmButtonColor="#B22222"
                cancelButtonColor="#01796f"
                onCancelPressed={() => {
                  setCloseShowable(false);
                } }
                onConfirmPressed={() => {
                  closeProject(project[0].id, token).then(navigation.navigate("Projects"));
                } } />
              <View style={{flexDirection:"row",marginTop:height/25}}>
                <Button
                  style={styles.button}
                  labelStyle={{color: '#22577A',fontWeight:"bold",textTransform:"uppercase"}}
                  buttonColor='#90D7B4'
                  mode="contained"
                  onPress={() => {
                    navigation.navigate("ModificationProject", {
                      project: project
                    });
                  } }>
                    Modifier projet
                </Button>
                <Button
                  style={styles.button}
                  labelStyle={{color: '#EBF7F3',fontWeight:"bold",textTransform:"uppercase"}}
                  buttonColor='#B22222'
                  mode="contained"
                  onPress={() => setCloseShowable(true)}>
                    Fermer projet
                </Button>
              </View>
            </>
          ) : []}
          <Text variant="titleSmall" style={{color:"#22577A",marginHorizontal:width/15, marginVertical:height/25}}>Description : {project[0]?.description}</Text>
        </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    marginVertical:10,
    padding:10,
    marginRight:30,
  },
  button:{
    flex:1,
    margin:5
  },
  title: {
    textTransform:"uppercase",
    textAlign:"center",
    color:"#01796F"
  },
  subtitle:{
    textAlign:"center",
    color:"#01796F",
    marginBottom:5
  },
  status:{
    textAlign:"center",
    color:"#22577A",
    marginTop:5
  },
  label: {
    fontSize:16,
    color:"#22577A",
    textDecorationLine:"underline",
    fontWeight:"bold"
  },
});