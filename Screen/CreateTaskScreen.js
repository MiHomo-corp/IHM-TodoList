import React from 'react'
import CreateTask from "../components/CreateTask"

import { TokenContext, UsernameContext } from '../Context/Context'

export default function CreateTaskScreen(){
    
    return (
        <TokenContext.Consumer>
          {([token, setToken]) => (
            <UsernameContext.Consumer>
              {([username, setUsername]) => {
                return (<CreateTask username={username} token={token}/>)
              }}
            </UsernameContext.Consumer>
          )}
        </TokenContext.Consumer>
    )
}