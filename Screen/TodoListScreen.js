import React from 'react'

import TodoList from '../components/Todolist'
import { TokenContext, UsernameContext } from '../Context/Context'

export default function TodoListScreen({navigation,route}){
  const { title, id, onDeleteTaskList } = route.params;

  return (
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
              {([username, setUsername]) => {
                return(<TodoList username={username} token={token} title={title} id={id} onDeleteTaskList={onDeleteTaskList}/>)
              }}
          </UsernameContext.Consumer>
        )}
      </TokenContext.Consumer>

  )
}