import React from 'react'
import CreateTask from "../components/CreateTask"
import { View, StyleSheet } from 'react-native'

import { TokenContext } from '../Context/Context'

export default function CreateTaskScreen({navigation,route}){
    
    const {idProject, titleProject, onHandleNewTask} = route.params

    return (
      <View style={styles.container}>
        <TokenContext.Consumer>
          {([token, setToken]) => {
                return (
                <View style={styles.container}>
                  <CreateTask token={token} idProject={idProject} titleProject={titleProject} onHandleNewTask={onHandleNewTask}/>
                </View>)
          }}
        </TokenContext.Consumer>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: "#EBF7F3",
      flex: 1,
  },
});