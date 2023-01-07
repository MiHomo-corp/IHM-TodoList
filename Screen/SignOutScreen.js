import React from 'react'
import { View, Text, Button } from 'react-native'

import { TokenContext, HierarchyContext } from '../Context/Context'

export default function SignOut ({ navigation }) {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <HierarchyContext.Consumer>
          {([hierarchy, setHierarchy]) => (
            <>
              <Text>Sign Out</Text>
              <Button title='Sign me out' onPress={() => {setHierarchy(null); setToken(null);}} />
            </>
          )}
        </HierarchyContext.Consumer>
      )}
    </TokenContext.Consumer>
  )
}