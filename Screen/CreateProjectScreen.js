import React from 'react'
import CreateProject from "../components/CreateProject"
import { View, StyleSheet } from 'react-native'

import { TokenContext, UsernameContext } from '../Context/Context'

export default function CreateProjectScreen(navigation,route){
    const {onHandleNewProject} = navigation.route.params

    return (
      <View style={styles.container}>
        <TokenContext.Consumer>
          {([token, setToken]) => (
            <UsernameContext.Consumer>
              {([username, setUsername]) => {
                return (
                <View style={styles.container}>
                  <CreateProject username={username} token={token} onHandleNewProject={onHandleNewProject}/> 
                </View>
                )
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