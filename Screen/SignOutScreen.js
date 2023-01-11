import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import { TokenContext, HierarchyContext } from '../Context/Context'

export default function SignOut ({ navigation }) {
  return (
    <View style={styles.container}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: "#EBF7F3",
      flex: 1,
  },
});