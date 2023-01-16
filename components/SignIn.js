import React, { useEffect,useState } from 'react'
import {Text,View,StyleSheet,ActivityIndicator,Image} from 'react-native'
import { Buffer } from 'buffer'
import { TextInput,Button } from 'react-native-paper';

import { signIn } from '../API/todoAPI'
import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'
import { HierarchyContext } from '../Context/Context'

export default function SignIn () {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(true)
  const [disabled, setDisabled] = useState(true)

  function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).status
  }

  const getSignedIn = (setToken, setUsername, setHierarchy) => {
    setError('')
    setVisible(false)
    signIn(login, password)
      .then(token => {
        setUsername(login)
        setHierarchy(parseJwt(token))
        setToken(token)
      })
      .catch(err => {
        setError(err.message)
      })
    setVisible(true)
  }

  useEffect(() => {
    if(login === "" || password === ""){
      setDisabled(true)
    }
    else{
      setDisabled(false)
    }
  })

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
                            label="Identifiant"
                            mode="outlined"
                            cursorColor="#01796f"
                            outlineColor="#01796f"
                            textColor="#01796f"
                            activeOutlineColor="#01796f"
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
                              label="Mot de Passe"
                              mode="outlined"
                              cursorColor="#01796f"
                              outlineColor="#01796f"
                              textColor="#01796f"
                              activeOutlineColor="#01796f"
                              secureTextEntry={true}
                              onChangeText={setPassword}
                              onSubmitEditing={() =>
                                getSignedIn(setToken, setUsername,setHierarchy)
                              } 
                              value={password}
                            />
                          </View>
                          {disabled ? (
                            <Button style={styles.button} disabled={disabled} icon="login" mode="contained">
                              CONNEXION
                            </Button>) : (<Button style={styles.button}  labelStyle={{color: '#22577A'}} buttonColor='#90D7B4' icon="login" mode="contained" onPress={() => getSignedIn(setToken, setUsername, setHierarchy)}>
                              CONNEXION
                            </Button>)}
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
    fontWeight:"bold",
    width:200,
    marginTop:25,
    marginBottom:10,
  },
  label: {
    marginTop:7,
    textAlign: 'right',
    minWidth: 70,
    marginRight:5
  },
  text_error: {
    textAlign:"center",
    color: '#B22222'
  },
  text_input: {
    margin: 10,
    width:250,
  }
})