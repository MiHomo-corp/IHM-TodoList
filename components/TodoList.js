import React,{useEffect, useState} from "react";
import { StyleSheet, View, TouchableOpacity, useWindowDimensions,ScrollView,LogBox } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper'
import AwesomeAlert from 'react-native-awesome-alerts';
import Checkbox from 'expo-checkbox';

import { useNavigation } from "@react-navigation/native";
import { getTasks, setCheckTask, closeProject, deleteProject, deleteTask, updateProjectStepDone, nextStepProject } from "../API/todoAPI"

export default function TodoList({hierarchy,token,id, onDeleteProject, onModificationProject, onNextStepProject}){

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const {height, width} = useWindowDimensions();
  const [tasks, setTask] = useState([]);
  const [project, setProject] = useState([]);
  const [commentaire, setCommentaire] = useState([]);
  const navigation = useNavigation();
  const [deleteShowable,setDeleteShowable] = useState(false)
  const [closeShowable,setCloseShowable] = useState(false)
  const [validationShowable,setValidationShowable] = useState(false)
  const [cancelShowable,setCancelShowable] = useState(false)
  const [showable,setShowable] = useState(false)


  // Fonction de gestion d'événement qui sera appelée lorsque la valeur de la checkbox change
  const handleChange = (item) => {
    setCheckTask(item.id, token, !item.done)
    .then(() => {
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

  const callback = (token, id) => {
    getTasks(token,id).then(rep =>{
      setTask(rep.tasks);
      setProject(rep.projects);
    })
  }

  const handleModificationTask = (updatedTask) => {
    setTask(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  }

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId, token).then(() => {
      // Mettre à jour la liste de tâches en filtrant les tâches qui ont l'identifiant de la tâche supprimée
      setTask(tasks.filter((task) => task.id !== taskId));
    });
  };

  const handleNewTask = (newTask) => {
    setTask([...tasks, newTask]);
  }

  const handleUpdateProject = (updatedProject) => {
    setProject([updatedProject]);
    onModificationProject(updatedProject)
  }

  useEffect(()=> {
    callback(token, id)
  }, [token, id])

  return(
    <ScrollView>
        <View>
          <AwesomeAlert
            show={showable}
            title="Validation d'étape"
            message="Votre demmande de Validation à bien été prise en compte."
            showCancelButton={false}
            showConfirmButton={true}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            confirmText="OK"
            confirmButtonColor="#90D7B4"
            onConfirmPressed={() => updateProjectStepDone(project[0].id, token).then(navigation.navigate("Projects"))}
          />
          {hierarchy === "Manager" ?(
            <>
              <Text variant="headlineLarge" style={styles.title}>{project[0]?.title} </Text>
              <Text variant="labelLarge" style={styles.subtitle}>par {project[0]?.owner.username}</Text>
            </>
          ):[]}
          {hierarchy === "ProjectChef" ?(
            <>
              <Text variant="headlineLarge" style={styles.title}>{project[0]?.title} </Text>
            </>
          ):[]}
          <View style={{borderBottomColor:"gray",borderBottomWidth:1,width: '100%',padding:5,opacity:0.33}}/>
          <Text variant="titleSmall" style={styles.status}>Status : {project[0]?.status}</Text>
          <Text variant="titleSmall" style={styles.status}>Date de fin : {project[0]?.date}</Text>

          {hierarchy === "ProjectChef" && verifDoneTask() && project[0]?.status !== "Terminé" ? (
            <>
              <View style={{alignItems:"center",marginTop:10,marginBottom:10}}>
                <Button
                  style={{width:350}}
                  labelStyle={!project[0]?.projectStepDone? {color: '#22577A',fontWeight:"bold"}:{}}
                  buttonColor='#90D7B4'
                  mode="contained"
                  disabled = {project[0]?.projectStepDone}
                  onPress={() => setShowable(true)}>
                    {project[0]?.projectStepDone ? "Demmande de validation en cours..." : "DEMMANDE DE VALIDATION ETAPE"}
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
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                cancelText="Annuler"
                confirmText="Confirmer"
                confirmButtonColor="#90D7B4"
                cancelButtonColor="#01796f"
                onCancelPressed={() => {
                  setValidationShowable(false);
                } }
                onConfirmPressed={() => {
                  nextStepProject(true,project[0].id,project[0].status, token).then((response) =>{
                    onNextStepProject(response.updateProjects.projects[0])
                    navigation.navigate("Projects")
                  })
                } } />
              <View style={{justifyContent:"center", flexDirection:"row",padding:5}}>
                <Button
                  style={styles.button}
                  labelStyle={{color: '#22577A',fontWeight:"bold",textTransform:"uppercase"}}
                  buttonColor='#90D7B4'
                  mode="contained"
                  onPress={() => setCancelShowable(!cancelShowable)}>
                    {cancelShowable ? "ANNULER" : "REFUSER ÉTAPE"}
                </Button>
                <Button
                  style={styles.button}
                  labelStyle={{fontWeight:"bold",textTransform:"uppercase"}}
                  buttonColor='#B22222'
                  mode="contained"
                  onPress={() => setValidationShowable(true)} >
                    Valider étape
                </Button>
              </View>
            </>
          ) : []}
          <View style={{ paddingHorizontal: 10, paddingTop:20}}>
            
            {cancelShowable? (
              <>
                <Text variant="titleSmall" style={styles.status}>Décriver la raison du refus :</Text>
                <TextInput
                  style={{ marginHorizontal: 20, marginVertical: 10, textAlign: "center" }}
                  mode="outlined"
                  label="Commentaire"
                  outlineColor="#01796f"
                  activeOutlineColor="#01796f"
                  textColor="#01796f"
                  onChangeText={setCommentaire}
                  value={commentaire}
                  multiline={true} />
                <Button
                  style={{ marginHorizontal: 20, marginVertical: 10, textAlign: "center" }}
                  labelStyle={{color: '#EBF7F3',fontWeight:"bold",textTransform:"uppercase"}}
                  icon="email-fast"
                  buttonColor='#B22222'
                  mode="contained"
                  onPress={() => nextStepProject(false,project[0].id,project[0].status, token,commentaire).then(navigation.navigate("Projects"))}>
                    ENVOYER
                </Button>
              </>
            ) : []}
            {tasks.map((item) => 
            <View key={item.id} style={{marginLeft:width/5, flexDirection: 'row', alignItems:"center"}}>
            <Checkbox 
              disabled={hierarchy==="Manager" || project[0]?.projectStepDone || project[0]?.status === "Fermé" || project[0]?.status === "Terminé"} 
              value={item.done} style={styles.checkbox} 
              onValueChange={() => handleChange(item)} />

            <TouchableOpacity onPress={() => {
              navigation.setOptions({
                onDeleteTask:handleDeleteTask
              })
              navigation.navigate("Task", {
                onDeleteTask:handleDeleteTask,
                onModificationTask:handleModificationTask,
                id:item.id
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
                    idProject: id,
                    onHandleNewTask: handleNewTask
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
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                cancelText="Annuler"
                confirmText="Confirmer"
                confirmButtonColor="#B22222"
                cancelButtonColor="#01796f"
                onCancelPressed={() => {
                  setDeleteShowable(false); 
                } }
                onConfirmPressed={() => {
                  deleteProject(project[0].id, token).then(onDeleteProject(project[0].id)).then(navigation.navigate("Projects"));
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
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                cancelText="Annuler"
                confirmText="Confirmer"
                confirmButtonColor="#B22222"
                cancelButtonColor="#01796f"
                onCancelPressed={() => {
                  setCloseShowable(false);
                } }
                onConfirmPressed={() => {
                  closeProject(id, token).then(navigation.navigate("Projects"));
                } } />
              <View style={{justifyContent:"center" ,flexDirection:"row",marginTop:height/25}}>
                <Button
                  style={styles.button}
                  labelStyle={{color: '#22577A',fontWeight:"bold",textTransform:"uppercase"}}
                  buttonColor='#90D7B4'
                  mode="contained"
                  onPress={() => {
                    navigation.navigate("ModificationProject", {
                      onUpdateProject:handleUpdateProject,
                      project: project
                    });
                  } }>
                    Modifier
                </Button>
                <Button
                  style={styles.button}
                  labelStyle={{color: '#EBF7F3',fontWeight:"bold",textTransform:"uppercase"}}
                  buttonColor='#B22222'
                  mode="contained"
                  onPress={() => setCloseShowable(true)}>
                    Fermer
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
    margin:5,
    fontSize:1,
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