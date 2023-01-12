import React,{useEffect, useState} from "react";

import { StyleSheet, View, Button, FlatList, TouchableOpacity} from 'react-native';
import { Text } from 'react-native-paper'
import { useNavigation } from "@react-navigation/native";

import { closeTaskList, getChefsOfManager, getTaskLists } from "../API/todoAPI"
import { TokenContext } from '../Context/Context'

export default function Todolists({hierarchy,username,token}){
  
  const [todos, setTodos] = useState([]);
  //const [userId, setUserId] = useState();
  const [newTodoText, setNewTodoText] = useState("");
  const navigation = useNavigation();
  
  const callback = (hierarchy, username, token) => {
      if(hierarchy === "Manager"){
        let usernameInArray = []
        getChefsOfManager(username,token).then(projectChefs => {
          projectChefs.forEach(element => {
            usernameInArray.push(element.username)
          })
        }).then(() => getTaskLists(usernameInArray,token).then(taskList =>{
          setTodos(taskList)
        }))
      }
      else{
        getTaskLists([username],token).then(taskList =>{
          setTodos(taskList)
        })
      }
  }

  useEffect(()=> {
    callback(hierarchy,username, token)
  }, [hierarchy, username, token])
  /*
  const getId = (username, token) => {
    getUserId(username, token).then(id => {
      setUserId(id[0].id)
    })
  }
*/
  const handleDeleteTaskList = (todoId) => {
    deleteTaskList(todoId, token).then((response) => {
      // Mettre à jour la liste de tasklists en filtrant la tasklist qui a l'identifiant de la tasklist supprimée
      setTodos(todos.filter((todo) => todo.id !== todoId));
    });
  };

  /*useEffect(()=> {
    getId(username, token)
  }, [username, token])*/

  return(
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <>
          {hierarchy === "ProjectChef" ? (
            <Button
              title="Créer un projet"
              onPress={() => navigation.navigate("CreateProject")} />) : []}
          <View style={{ flex: 1, position: 'relative'}}>
            <View style={{ position: 'absolute', left: 0, right: 0}}>
              <FlatList
                style={{ textAlign: 'left', paddingLeft: 10, paddingTop: 20, paddingLeft:0, marginLeft:0 }}
                data={todos}
                renderItem={({ item }) => 
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity 
                      onPress={() => {
                        navigation.push("TodoList", {
                          title: item.title,
                          usernameOfOwner : item.owner.username
                        });
                      } } style={{width:"100%"}}>
                      <View flexDirection="row">
                      <Text variant="headlineSmall" style={styles.title}>{item.title} </Text>
                      {hierarchy === "Manager" ?(
                        <>
                          <Text variant="labelSmall" style={styles.author}>- par {item.owner.username}</Text>
                        </>
                      ):[]}
                      </View>
                      <View flexDirection="row">
                        <View style={styles.container}>
                          <Text variant="labelLarge" style={styles.label}>Statut : </Text>
                          <Text variant="labelLarge" style={styles.label}>Date de fin :</Text>
                        </View>
                        <View style={[styles.container,{width:200}]}>
                          <Text variant="bodyMedium" style={styles.text}>{item.status}</Text>
                          <Text variant="bodyMedium" style={styles.text}>{item.date}</Text>
                        </View>
                      </View>
                      
                      
                      <View style={{borderBottomColor:"gray",borderBottomWidth:1,width: '100%',padding:5}}/>
                    </TouchableOpacity>
                  </View>
                }
              />
            </View>
          </View>
        </>    
      )}
    </TokenContext.Consumer>
  )
}

const styles = StyleSheet.create({
  login: {
    marginRight:2,
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
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
  }
})