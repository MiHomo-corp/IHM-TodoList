import React from 'react'
import { View, Text, Button } from 'react-native'

import Task from '../components/Task'
import { HierarchyContext, TokenContext } from '../Context/Context'

export default function TaskScreen({ navigation, route }){
  const { title, id, onDeleteTask, onModificationTask} = route.params;

  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <HierarchyContext.Consumer>
          {([hierarchy, setToken]) => (
            <Task hierarchy={hierarchy} token={token} title={title} id={id} onDeleteTask={onDeleteTask} onModificationTask={onModificationTask}/>
          )}
        </HierarchyContext.Consumer>
      )}
    </TokenContext.Consumer>
  )
}