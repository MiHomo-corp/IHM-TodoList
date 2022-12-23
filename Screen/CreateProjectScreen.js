import React from 'react'
import CreateProject from "../components/CreateProject"

import { TokenContext, UsernameContext } from '../Context/Context'

export default function CreateProjectScreen(){
    
    return (
        <TokenContext.Consumer>
          {([token, setToken]) => (
            <UsernameContext.Consumer>
              {([username, setUsername]) => {
                return (<CreateProject username={username} token={token}/>)
              }}
            </UsernameContext.Consumer>
          )}
        </TokenContext.Consumer>
    )
}