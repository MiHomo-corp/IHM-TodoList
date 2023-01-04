import React from 'react'
import { View, Text, Button } from 'react-native'

import Task from '../components/Task'
import { TokenContext } from '../Context/Context'

export default function TaskScreen({ navigation, route }){
  const { title, id, onDeleteTask} = route.params;

  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <Task token={token} title={title} id={id} onDeleteTask={onDeleteTask}/>
      )}
    </TokenContext.Consumer>
  )
}