import React, { useEffect, useState } from 'react'
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native'

import { RadioButton } from 'react-native-paper';
import { getManager, signUp } from '../API/todoAPI'

import { useNavigation } from "@react-navigation/native";

import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'

export default function SignUp () {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [copyPassword, setCopyPassword] = useState('')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(true)
  const [checked, setChecked] = useState('');
  const [managerChecked, setManagerChecked] = useState('')
  const [managerList, setManagerList] = useState([])
  const navigation = useNavigation();


  const callback = () => {
    getManager().then(managers => {
      setManagerList(managers)
    })
  }
  
  useEffect(()=> {
    callback()
  }, [])

  const getSignedUp = (setToken, setUsername) => {
    setError('')
    if (login === '' || password === '' || copyPassword === '' || checked === '' || (checked === "ProjectChef" && managerChecked === "")) return
    if (password !== copyPassword){
        setError("Passwords don't match")
        return
    } 
    setVisible(false)
    signUp(checked, login, password, managerChecked)
      .then(token => {
        setUsername(login)
        setToken(token)
      })
      .catch(err => {
        setError(err.message)
      })
    navigation.navigate("SignIn")
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
                        status={ checked === 'ProjectChef' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('ProjectChef')}
                      />
                      <Text style={styles.label}>Chef de projet</Text>
                      <RadioButton
                        status={ checked === 'Manager' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('Manager')}
                      />
                      <Text style={styles.label}>Responsable</Text>
                    </View>
                    {checked === "ProjectChef" ? (
                      <FlatList
                      style={{ textAlign: 'left', paddingLeft: 10, paddingTop: 20 }}
                      data={managerList}
                      renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>
                        <RadioButton
                          status={ managerChecked === item.username ? 'checked' : 'unchecked' }
                          onPress={() => setManagerChecked(item.username)}
                        />
                        <Text style={styles.label}>{item.username}</Text>
                    </View>}/>
                    ) : []}
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


/**/