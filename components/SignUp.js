import React, { useEffect, useState } from 'react'
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Pressable
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
                <Image style={{ marginTop: -200 }} source={require('../images/todovlop.png')}/>
                {visible ? (
                  <>
                    <View style={{ justifyContent: 'center', alignItems:"center"}}>
                      <View style={{ flexDirection: 'row' }}>
                        <TextInput
                          style={styles.text_input}
                          placeholder="  Identifiant"
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
                          placeholder="  Mot de passe"
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
                          placeholder="  Vérification MDP"
                          onChangeText={setCopyPassword}
                          secureTextEntry={true}
                          onSubmitEditing={() =>
                            getSignedUp(setToken, setUsername)
                          }
                          value={copyPassword}
                        />
                      </View>
                      <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.label}>Etes-vous un :</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <RadioButton
                            status={ checked === 'ProjectChef' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('ProjectChef')}
                          />
                          <Text style={styles.label}>Chef de projet</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <RadioButton
                            status={ checked === 'Manager' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('Manager')}
                          />
                          <Text style={styles.label}>Responsable</Text>
                        </View>
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
                      <Pressable style={styles.button}onPress={() => getSignedUp(setToken, setUsername)}>
                        <Text style={styles.buttonText}>S'INSCRIRE</Text>
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
    textAlign: 'center',
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


/**/