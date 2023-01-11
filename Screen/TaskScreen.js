import React from 'react'
import { View, StyleSheet } from 'react-native'

import Task from '../components/Task'
import { HierarchyContext, TokenContext } from '../Context/Context'

export default function TaskScreen({ navigation, route }){
  const { title, id, onDeleteTask} = route.params;

  return (
    <View style={styles.container}>
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <HierarchyContext.Consumer>
            {([hierarchy, setToken]) => (
              <Task hierarchy={hierarchy} token={token} title={title} id={id} onDeleteTask={onDeleteTask}/>
            )}
          </HierarchyContext.Consumer>
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