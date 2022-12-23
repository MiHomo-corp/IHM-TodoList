import React from 'react'

import TodoList from '../components/TodoList'
import { TokenContext, UsernameContext } from '../Context/Context'

export default function TodoListScreen({navigation,route}){
  const { title } = route.params;

  return (
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
              {([username, setUsername]) => {
                return(<TodoList username={username} token={token} title={title}/>)
              }}
          </UsernameContext.Consumer>
        )}
      </TokenContext.Consumer>

  )
}