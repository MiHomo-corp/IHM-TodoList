import React from 'react'
import CreateTask from "../components/CreateTask"
import { View } from 'react-native'

import { TokenContext, UsernameContext } from '../Context/Context'

export default function CreateTaskScreen({navigation,route}){
    
    const {idProject, titleProject, onHandleNewTask} = route.params

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
                <CreateTask username={username} token={token} idProject={idProject} titleProject={titleProject} onHandleNewTask={onHandleNewTask}/>
                </View>)
              }}
            </UsernameContext.Consumer>
          )}
        </TokenContext.Consumer>
    )
}