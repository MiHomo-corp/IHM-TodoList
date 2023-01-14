import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native'

import { RadioButton,Button,TextInput,Text } from 'react-native-paper';
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
  const [disabled, setDisabled] = useState(true)
  const navigation = useNavigation();

  const callback = () => {
    getManager().then(managers => {
      setManagerList(managers)
    })
  }
  
  useEffect(()=> {
    callback()
  }, [])

  useEffect(() => {
    if (login === '' || password === '' || copyPassword === '' || checked === '' || (checked === "ProjectChef" && managerChecked === "")){
      setDisabled(true)
    }
    else{
      setDisabled(false)
    }
  })

  const getSignedUp = (setToken, setUsername) => {
    setError('')
    if (password !== copyPassword){
        setError("Passwords don't match")
        return
    } 
    setVisible(false)
    signUp(checked, login, password, managerChecked)
      .then(token => {
        //setUsername(login)
        //setToken(token)
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
                <Image style={{ marginTop: -200 }} source={require('../images/todovlop.png')}/>
                {visible ? (
                  <>
                    <View style={{ justifyContent: 'center', alignItems:"center"}}>
                      <View style={{ flexDirection: 'row' }}>
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
                            getSignedUp(setToken, setUsername)
                          }
                          value={login}
                        />
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <TextInput
                          style={styles.text_input}
                          label="Mot de passe"
                          mode="outlined"
                          cursorColor="#01796f"
                          outlineColor="#01796f"
                          textColor="#01796f"
                          activeOutlineColor="#01796f"
                          onChangeText={setPassword}
                          secureTextEntry={true}
                          onSubmitEditing={() =>
                            getSignedUp(setToken, setUsername)
                          }
                          value={password}
                        />
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                      <TextInput
                          style={styles.text_input}
                          label="Verification Mot de passe"
                          mode="outlined"
                          cursorColor="#01796f"
                          outlineColor="#01796f"
                          textColor="#01796f"
                          activeOutlineColor="#01796f"
                          onChangeText={setCopyPassword}
                          secureTextEntry={true}
                          onSubmitEditing={() =>
                            getSignedUp(setToken, setUsername)
                          }
                          value={copyPassword}
                        />
                      </View>
                      <View style={{ flexDirection: 'column' }}>
                      <Text variant="titleMedium" style={styles.radio}>Etes-vous un :</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <RadioButton
                            color='#90D7B4'
                            status={ checked === 'ProjectChef' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('ProjectChef')}
                          />
                          <Text variant="titleMedium" style={styles.radio}>Chef de projet</Text>
                          {checked === "ProjectChef" ? (
                          <FlatList
                          style={{ textAlign: 'left', paddingLeft: 10, paddingTop: 20 }}
                          data={managerList}
                          renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                              color='#90D7B4'
                              status={ managerChecked === item.username ? 'checked' : 'unchecked' }
                              onPress={() => setManagerChecked(item.username)}
                            />
                            <Text variant="titleMedium" style={styles.radio}>{item.username}</Text>
                        </View>}/>
                        ) : []}
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <RadioButton
                            color='#90D7B4'
                            status={ checked === 'Manager' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('Manager')}
                          />
                          <Text variant="titleMedium" style={styles.radio}>Responsable</Text>
                        </View>
                      </View>
                      {disabled ? (
                        <Button style={styles.button} disabled={disabled} icon="alert" mode="contained">
                          Tout les champs ne sont pas remplis...
                        </Button>) : (<Button style={styles.button} labelStyle={{color: '#22577A'}} buttonColor='#90D7B4' icon="clipboard-account-outline" mode="contained" onPress={() => getSignedUp(setToken, setUsername, setHierarchy)}>
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
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>
  )
}

const styles = StyleSheet.create({
  login: {
    marginRight:2,
  },
  radio:{
    marginVertical:7, 
    color:"#01796f"
  },
  button: {
    justifyContent:'center',
    alignItems:'center',
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
  text_error: {
    color: 'red'
  },
  text_input: {
    margin: 10,
    width:250,
    height:30,
  }
})