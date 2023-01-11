import React, { useState } from 'react'
import { Button, StyleSheet, Text, View} from 'react-native'

import Navigation from './Navigation/Navigation'

import { TokenContext, UsernameContext, HierarchyContext } from './Context/Context'

export default function App () {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState(null)
  const [hierarchy, setHierarchy] = useState(null)


  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <HierarchyContext.Provider value={[hierarchy, setHierarchy]}>
          <Navigation />
        </HierarchyContext.Provider>
      </TokenContext.Provider>
    </UsernameContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
