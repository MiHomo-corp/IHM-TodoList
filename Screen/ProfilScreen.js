import React from 'react'
import { Button } from 'react-native';
import { HierarchyContext, TokenContext, UsernameContext } from '../Context/Context'
import Profil from '../components/Profil'; 

export default function ProfilScreen () {

  return (
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
  )
}
