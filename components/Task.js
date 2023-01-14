import React,{useEffect, useState} from "react";
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Text, Button } from 'react-native-paper'
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNavigation } from "@react-navigation/native";

import { getTask , deleteTask } from "../API/todoAPI"
import Logo from "../images/task.svg"

export default function Task({hierarchy,token,id,onDeleteTask,onModificationTask}){ //Hierarchie
  
  const {height, width} = useWindowDimensions();
  const [task, setTask] = useState([]);
  const navigation = useNavigation();
  const [showable,setShowable] = useState(false)


  const callback = (token, id) => {
    getTask(token,id).then(rep =>{
      setTask(rep.tasks[0]);
    })
  }

  const handleUpdateTask = (updatedTask) => {
    setTask(updatedTask);
    onModificationTask(updatedTask)
}

  useEffect(()=> {
    callback(token, id)
  }, [token, id])

  /*useEffect(() => {
    //setTask(task => task.filter(t => t.id !== id));
  }, [id])*/

  return(
    <View>
        <Text variant="headlineLarge" style={styles.title}>{task?.content} </Text>
        <View style={{borderBottomColor:"gray",borderBottomWidth:1,width: '100%',padding:5,opacity:0.33}}/>
      {task?.description ? (
        <>
          <Text variant="titleSmall" style={{color:"#22577A",marginHorizontal:width/15, marginVertical:height/25}}>Description : {task?.description}</Text>
        </>
      ) : <Text variant="titleSmall" style={{color:"#22577A",marginHorizontal:width/15, marginVertical:height/25}}>Cette tâche n'a pas de description</Text>}
      {hierarchy === "ProjectChef" ? (
        <>
        <AwesomeAlert
          show={showable}
          title="ATTENTION"
          message="Etes-vous sur de vouloir supprimer cette tâche de votre projet ? Cette action est irrémédiable !"
          showCancelButton={true}
          showConfirmButton={true}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          cancelText="Annuler"
          confirmText="Confirmer"
          confirmButtonColor="#B22222"
          cancelButtonColor="#01796f"
          onCancelPressed={() => {
            setShowable(false);
          } }
          onConfirmPressed={() => {
            deleteTask(id, token).then(response => {
              onDeleteTask(id);
              // Revenir à l'écran précédent une fois le projet supprimé
              navigation.goBack();
            });
          }} />
        <View style={{flexDirection:"row",marginTop:height/25}}>
          <Button
            style={styles.button}
            labelStyle={{color: '#22577A',fontWeight:"bold",textTransform:"uppercase"}}
            buttonColor='#90D7B4'
            mode="contained"
            onPress={() => {
              navigation.navigate("ModificationTask", {
                onUpdateTask:handleUpdateTask,
                task:task,
              });
            } }>
              Modifier tâche
          </Button>
          <Button
            style={styles.button}
            labelStyle={{color: '#EBF7F3',fontWeight:"bold",textTransform:"uppercase"}}
            buttonColor='#B22222'
            mode="contained"
            onPress={() => setShowable(true)}>
              Suprimer tâche
          </Button>
        </View></>
      ) : []}
      <View style={{marginTop:height/20, alignItems:"center"}}>
        <Logo width={width/1.5} height={height/5} />
      </View>      
    </View>
  )
}


const styles = StyleSheet.create({
  button:{
    flex:1,
    margin:5
  },
  title: {
    textTransform:"uppercase",
    textAlign:"center",
    color:"#01796F"
  },
});