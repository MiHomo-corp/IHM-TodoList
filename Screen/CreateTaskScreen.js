import React from 'react'
import CreateTask from "../components/CreateTask"
import { View, StyleSheet } from 'react-native'

import { TokenContext, UsernameContext } from '../Context/Context'

export default function CreateTaskScreen({navigation,route}){
    
    const {idProject, titleProject} = route.params

    return (
      <View style={styles.container}>
        <TokenContext.Consumer>
          {([token, setToken]) => (
            <UsernameContext.Consumer>
              {([username, setUsername]) => {
                return (
                  <View
                  style={{
                    backgroundColor:"#EBF7F3",
                    flex: 1,
                    //justifyContent: 'center',
                    //alignItems: 'center'
                  }}
                >
                <CreateTask username={username} token={token} idProject={idProject} titleProject={titleProject}/>
                </View>)
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