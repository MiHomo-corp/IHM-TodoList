import React from 'react'
import Projects from "../components/Projects"
import { View, StyleSheet} from 'react-native'

import {UsernameContext, HierarchyContext, TokenContext } from '../Context/Context'

export default function ProjectsScreen(){
    return (
      <View style={styles.container}>
        <TokenContext.Consumer>
          {([token, setToken]) => (
            <UsernameContext.Consumer>
              {([username, setUsername]) => (
                <HierarchyContext.Consumer>
                  {([hierarchy, setHierarchy]) => {
                    return (<Projects hierarchy={hierarchy} username={username} token={token}/>)
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