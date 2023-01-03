import React, { useState } from 'react'
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

import { RadioButton } from 'react-native-paper';
import { signUp } from '../API/todoAPI'

import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'

export default function SignUp () {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [copyPassword, setCopyPassword] = useState('')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(true)
  const [checked, setChecked] = useState('');

  const getSignedUp = (setToken, setUsername) => {
    setError('')
    if (login === '' || password === '' || copyPassword === '' || checked === '') return
    if (password != copyPassword){
        setError("Passwords don't match")
        return
    } 
    setVisible(false)
    signUp(checked,login, password)
      .then(token => {
        setUsername(login)
        setToken(token)
      })
      .catch(err => {
        setError(err.message)
      })
    setVisible(true)
  }

  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => {
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
                          getSignedUp(setToken, setUsername)
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
                          getSignedUp(setToken, setUsername)
                        }
                        value={password}
                      />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.label}>Password Again</Text>
                      <TextInput
                        style={styles.text_input}
                        onChangeText={setCopyPassword}
                        secureTextEntry={true}
                        onSubmitEditing={() =>
                          getSignedUp(setToken, setUsername)
                        }
                        value={copyPassword}
                      />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.label}>Etes-vous un :</Text>
                      <RadioButton
                        status={ checked === 'chef' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('chef')}
                      />
                      <Text style={styles.label}>Chef de projet</Text>
                      <RadioButton
                        status={ checked === 'manager' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('manager')}
                      />
                      <Text style={styles.label}>Manager</Text>
                    </View>
                    <Button
                      onPress={() => getSignedUp(setToken, setUsername)}
                      title='Sign Up'
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
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>
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
    //borderWidth: 1,
    backgroundColor: 'white',
    margin: 5
  }
})
