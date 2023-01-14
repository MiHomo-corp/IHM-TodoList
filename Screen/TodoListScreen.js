import React from 'react'
import { View, StyleSheet} from 'react-native'

import TodoList from '../components/TodoList'
import { HierarchyContext, TokenContext, UsernameContext } from '../Context/Context'

export default function TodoListScreen({navigation,route}){
  const { usernameOfOwner } = route.params;
  const { title } = route.params

  return (
    <View style={styles.container}>
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
              {([username, setUsername]) => (
                <HierarchyContext.Consumer>
                  {([hierarchy, setHierarchy]) => {
                    return(<TodoList hierarchy={hierarchy} username={username} token={token} title={title} usernameOfOwner={usernameOfOwner}/>)
                  }}
                </HierarchyContext.Consumer>
              )}
          </UsernameContext.Consumer>
        )}
      </TokenContext.Consumer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: "#EBF7F3",
      flex: 1,
  },
});