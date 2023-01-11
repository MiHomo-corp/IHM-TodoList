import React from 'react'
import ModificationProject from "../components/ModificationProject"
import { View, StyleSheet } from 'react-native';
import { TokenContext } from '../Context/Context'

export default function ModificationProjectScreen(navigation,route){
  const { project } = navigation.route.params;

  return (
    <View style={styles.container}>
      <TokenContext.Consumer>
        {([token, setToken]) => {
              return(<ModificationProject token={token} project={project}/>)
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