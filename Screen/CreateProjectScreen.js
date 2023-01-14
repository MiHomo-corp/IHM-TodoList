import React from 'react'
import CreateProject from "../components/CreateProject"
import { View } from 'react-native'

import { TokenContext, UsernameContext } from '../Context/Context'

export default function CreateProjectScreen({navigation, route}){
  const {onHandleNewTaskList} = route.params

  return (
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
              <CreateProject username={username} token={token} onHandleNewTaskList={onHandleNewTaskList}/> 
              </View>
              )
            }}
          </UsernameContext.Consumer>
        )}
      </TokenContext.Consumer>
  )
}