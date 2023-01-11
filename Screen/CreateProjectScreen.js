import React from 'react'
import CreateProject from "../components/CreateProject"
import { View } from 'react-native'

import { TokenContext, UsernameContext } from '../Context/Context'

export default function CreateProjectScreen(){
    
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
                <CreateProject username={username} token={token}/> 
                </View>
                )
              }}
            </UsernameContext.Consumer>
          )}
        </TokenContext.Consumer>
    )
}