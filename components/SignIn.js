import React, { useState } from 'react'
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

import { signIn } from '../API/todoAPI'
import { Buffer } from "buffer"
import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'
import { HierarchyContext } from '../Context/Context'

export default function SignIn () {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(true)

  function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).status;
  }
  const getSignedIn = (setToken, setUsername, setHierarchy) => {
    setError('')
    if (login == '' || password == '') return
    setVisible(false)
    signIn(login, password)
      .then(token => {
        setUsername(login)
        setToken(token)
        setHierarchy(parseJwt(token))
      })
      .catch(err => {
        setError(err.message)
      })
    setVisible(true)
  }

  return (
    <HierarchyContext.Consumer>
      {([hierarchy, setHierarchy]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => (
            <TokenContext.Consumer>
              {([token, setToken]) => {  
                return (
                  <View>
                    {visible ? (
                      <>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.label}>Login</Text>
                          <TextInput
                            style={styles.text_input}
                            onChangeText={setLogin}
                            onSubmitEditing={() =>
                              getSignedIn(setToken, setUsername,setHierarchy)
                            }
                            value={login}
                          />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.label}>Password</Text>
                          <TextInput
                            style={styles.text_input}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            onSubmitEditing={() =>
                              getSignedIn(setToken, setUsername, setHierarchy)
                            }
                            value={password}
                          />
                        </View>
                        <Button
                          onPress={() => getSignedIn(setToken, setUsername, setHierarchy)}
                          title='Sign In'
                        />
                        {error ? (
                          <Text style={styles.text_error}>{error}</Text>
                        ) : (
                          []
                        )}
                      </>
                    ) : (
                      <ActivityIndicator />
                    )}
                  </View>
                )
              }}
            </TokenContext.Consumer>
          )}
        </UsernameContext.Consumer>
      )}
    </HierarchyContext.Consumer>
  )
}

const styles = StyleSheet.create({
  label: {
    width: 70
  },
  text_error: {
    color: 'red'
  },
  text_input: {
    backgroundColor: 'white',
    margin: 5
  }
})
