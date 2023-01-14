import React from 'react'
import ModificationTask from "../components/ModificationTask"
import { View, StyleSheet } from 'react-native'

import { TokenContext } from '../Context/Context'

export default function ModificationProjectScreen(route){
    const { task } = route.route.params;

    return (
      <View style={styles.container}>
        <TokenContext.Consumer>
          {([token, setToken]) => {
                return(
                <View style={styles.container}>
                  <ModificationTask token={token} task={task}/>
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