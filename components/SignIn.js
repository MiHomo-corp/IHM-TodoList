import React, { useState } from 'react'
import {Text,TextInput,Button,View,StyleSheet,ActivityIndicator,Image,Pressable} from 'react-native'
import { signIn } from '../API/todoAPI'
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
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => (
            <HierarchyContext.Consumer>
              {([hierarchy, setHierarchy]) => {  
                return (
                  <View>
                    <Image style={{ marginTop: -200 }} source={require('../images/todovlop.png')}/>
                    {visible ? (
                      <>
                        <View style={{ justifyContent: 'center', alignItems:"center"}}>
                          <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>
                            <TextInput
                              style={styles.text_input}
                              placeholder="  Identifiant"
                              onChangeText={setLogin}
                              onSubmitEditing={() =>
                                getSignedIn(setToken, setUsername,setHierarchy)
                              }
                              value={login}
                            />
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <TextInput
                              style={styles.text_input}
                              placeholder="  Mot de passe"
                              onChangeText={setPassword}
                              secureTextEntry={true}
                              onSubmitEditing={() =>
                                getSignedIn(setToken, setUsername, setHierarchy)
                              }
                              value={password}
                            />
                          </View>
                          <Pressable style={styles.button}onPress={() => getSignedIn(setToken, setUsername, setHierarchy)}>
                            <Text style={styles.buttonText}>CONNEXION</Text>
                          </Pressable>
                        </View>
                        
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
            </HierarchyContext.Consumer>
          )}
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>
  )
}

const styles = StyleSheet.create({
  login: {
    marginRight:2,
  },
  button: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#90D7B4',
    width:300,
    height:40,
    marginTop:25,
    marginBottom:10,
    elevation:1
  },
  buttonText:{
    color:'#22577A',
    fontSize:18,
    fontWeight:"bold",
  },
  label: {
    marginTop:7,
    textAlign: 'right',
    minWidth: 70,
    marginRight:5
  },
  text_error: {
    color: 'red'
  },
  text_input: {
    backgroundColor: 'white',
    margin: 10,
    width:200,
    height:30,
    borderWidth:1,
    borderColor:"gray",
    elevation:5
  }
})