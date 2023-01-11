import React from 'react'
import { Button, View, StyleSheet } from 'react-native';
import { HierarchyContext, TokenContext, UsernameContext } from '../Context/Context'
import Profil from '../components/Profil'; 

export default function ProfilScreen () {

  return (
    <View style={styles.container}>
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
            {([username, setUsername]) => (
              <HierarchyContext.Consumer>
                {([hierarchy, setHierarchy]) => {
                  return (
                  <>
                    <Profil hierarchy={hierarchy} username={username} token={token} />
                    <Button title='Déconnexion' onPress={() => { setHierarchy(null); setToken(null); } } />
                  </>
                  )
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