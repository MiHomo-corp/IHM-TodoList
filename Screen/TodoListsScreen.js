import React from 'react'
import Todolists from "../components/Todolists"

import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'

export default function TodoList(){
    
    return (
        <TokenContext.Consumer>
          {([token, setToken]) => (
            <UsernameContext.Consumer>
              {([username, setUsername]) => {
                return (<Todolists username={username} token={token}/>)
              }}
            </UsernameContext.Consumer>
          )}
        </TokenContext.Consumer>
    )
}