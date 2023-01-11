import React from 'react'
import CreateTask from "../components/CreateTask"
import { View, StyleSheet } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context'

export default function CreateTaskScreen({navigation,route}){
    
  const {idProject} = route.params

  return (
    <View style={styles.container}>
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
            {([username, setUsername]) => {
              return (<CreateTask username={username} token={token} idProject={idProject}/>)
            }}
          </UsernameContext.Consumer>
        )}
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