import React from 'react'
import ModificationProject from "../components/ModificationProject"
import { View, StyleSheet } from 'react-native'

import { TokenContext } from '../Context/Context'

export default function ModificationProjectScreen(navigation,route){
    const { project, onUpdateProject } = navigation.route.params;

    return (
      <View style={styles.container}>
        <TokenContext.Consumer>
          {([token, setToken]) => {
                return(
                <View style={styles.container}>
                  <ModificationProject token={token} project={project} onUpdateProject={onUpdateProject}/>
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