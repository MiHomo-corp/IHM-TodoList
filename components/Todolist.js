import React,{useEffect, useState} from "react";

import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch, TouchableOpacity, Checkbox } from 'react-native';
import { Root, Popup } from 'react-native-popup-confirm-toast'
import { useNavigation } from "@react-navigation/native";

import { getTasks, createTask, setStatusTask } from "../API/todoAPI"

//<Checkbox value={item.done} onValueChange={setStatusTask}/>

export default function TodoList({username,token,title}){
  const [tasks, setTask] = useState([]);
  const [project, setProject] = useState([]);
  const navigation = useNavigation();


  //const [newTodoText, setNewTodoText] = useState("");
  //const navigation = useNavigation();

  const callback = (username, token, title) => {
    getTasks(username,token,title).then(rep =>{
      setTask(rep.tasks);
      setProject(rep.taskLists);
    })
  }

  useEffect(()=> {
    callback(username, token, title)
  }, [username, token, title])

  return(
    <Root>
      <View>
        <Text>Ma tasklist</Text>
        <Button
            title="Modification projet"
            onPress={() => 
              Popup.show({
                type: 'warning',
                title: 'Dikkat!',
                textBody: 'Mutlak özgürlük, kendi başına hiçbir anlam ifade etmez. ',
                buttonText: 'Tamam',
                confirmText: 'Vazgeç',
                callback: () => {
                    alert('Okey Callback && hidden');
                    Popup.hide();
                },
                cancelCallback: () => {
                    alert('Cancel Callback && hidden');
                    Popup.hide();
                },
            })
        }/>
        <Button
            title="Suppression projet"
            onPress={() => alert("")} />
        <FlatList
          style={{ textAlign:'left', paddingLeft: 10, paddingTop:20}}
          data={tasks}
          renderItem={({item}) => 
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => {
                console.log(item.done)
              }}>
                <Text style={[{color: '#D6D5A8', textDecorationLine: 'underline'}]}>{item.content}</Text>
              </TouchableOpacity>
              
            </View>
          }
        />
      </View>
    </Root>
  )


}