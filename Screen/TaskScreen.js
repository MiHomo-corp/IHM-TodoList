import React from 'react'
import { View, Text, Button } from 'react-native'

import Task from '../components/Task'
import { TokenContext } from '../Context/Context'

export default function TaskScreen({ navigation, route }){
  const { title, id } = route.params;

  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <Task token={token} title={title} id={id}/>
      )}
    </TokenContext.Consumer>
  )
}