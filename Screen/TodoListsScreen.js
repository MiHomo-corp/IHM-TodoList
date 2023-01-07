import React from 'react'
import Todolists from "../components/Todolists"

import {UsernameContext, HierarchyContext, TokenContext } from '../Context/Context'

export default function TodoList(){
    return (
        <TokenContext.Consumer>
          {([token, setToken]) => (
            <UsernameContext.Consumer>
              {([username, setUsername]) => (
                <HierarchyContext.Consumer>
                  {([hierarchy, setHierarchy]) => {
                    return (<Todolists hierarchy={hierarchy} username={username} token={token}/>)
                  }}
                </HierarchyContext.Consumer>
              )}
            </UsernameContext.Consumer>
          )}
        </TokenContext.Consumer>
    )
}