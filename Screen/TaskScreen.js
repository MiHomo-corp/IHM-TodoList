import React from 'react'
import { View, StyleSheet } from 'react-native'

import Task from '../components/Task'
import { HierarchyContext, TokenContext } from '../Context/Context'

export default function TaskScreen({ navigation, route }){
  const { id, onDeleteTask, onModificationTask} = route.params;

  return (
    <View style={styles.container}>
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <HierarchyContext.Consumer>
            {([hierarchy, setToken]) => (
              <Task hierarchy={hierarchy} token={token} id={id} onDeleteTask={onDeleteTask} onModificationTask={onModificationTask}/>
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