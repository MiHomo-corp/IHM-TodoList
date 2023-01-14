import React from 'react'

import TodoList from '../components/Todolist'
import { HierarchyContext, TokenContext, UsernameContext } from '../Context/Context'

export default function TodoListScreen({navigation,route}){
  const { usernameOfOwner } = route.params;
  const { title, onDeleteTaskList } = route.params

  return (
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
              {([username, setUsername]) => (
                <HierarchyContext.Consumer>
                  {([hierarchy, setHierarchy]) => {
                    return(<TodoList hierarchy={hierarchy} username={username} token={token} title={title} usernameOfOwner={usernameOfOwner} onDeleteTaskList={onDeleteTaskList}/>)
                  }}
                </HierarchyContext.Consumer>
              )}
          </UsernameContext.Consumer>
        )}
      </TokenContext.Consumer>

  )
}