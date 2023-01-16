import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ActivityIndicator, FlatList, Image, ScrollView, useWindowDimensions} from 'react-native'

import { RadioButton,Button,TextInput,Text } from 'react-native-paper';
import { getManager, signUp } from '../API/todoAPI'
import AwesomeAlert from 'react-native-awesome-alerts';

import { useNavigation } from "@react-navigation/native";

import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'

export default function SignUp () {
  const {height, width} = useWindowDimensions();
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [copyPassword, setCopyPassword] = useState('')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(true)
  const [checked, setChecked] = useState('');
  const [managerChecked, setManagerChecked] = useState('')
  const [managerList, setManagerList] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [showable,setShowable] = useState(false)
  const navigation = useNavigation();

  const callback = () => {
    getManager().then(managers => {
      setManagerList(managers)
    })
  }
  
  const renderManagers = () => {
    return managerList.map((item) => 
      <View style={{ flexDirection: 'row' }}>
        <RadioButton
          color='#90D7B4'
          status={ managerChecked === item.username ? 'checked' : 'unchecked' }
          onPress={() => setManagerChecked(item.username)}
        />
        <Text variant="titleMedium" style={styles.radio}>{item.username}</Text>
        <Text style={{flex:0.1}}></Text>
      </View>)
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

  const getSignedUp = () => {
    setError('')
    signUp(checked, login, password, managerChecked)
      .then(() => {
        navigation.navigate("SignIn")
      })
      .catch(err => {
        setShowable(false);
        setError(err.message)
      })
  }

  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => {
            return (
              <View>
                <ScrollView>
                <Image style={{width:width/1.2, height:height/3}} source={require('../images/todovlop.png')}/>
                {visible ? (
                  <>
                    <View style={{ justifyContent: 'center', alignItems:"center"}}>
                      <AwesomeAlert
                        show={showable}
                        title="Inscription"
                        message="Votre compte a été créé avec succés"
                        showCancelButton={false}
                        showConfirmButton={true}
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        confirmText="Ok"
                        confirmButtonColor="#90D7B4"
                        onConfirmPressed={() => getSignedUp(setToken, setUsername)}
                      />
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
                    </View>
                    <View style={{ flexDirection: 'column', paddingLeft:60 }}>
                      <Text variant="titleMedium" style={styles.radio}>Etes-vous un :</Text>
                      <View style={{ flexDirection: 'row', paddingLeft:20,paddingTop:10 }}>
                        <RadioButton
                          color='#90D7B4'
                          status={ checked === 'Manager' ? 'checked' : 'unchecked' }
                          onPress={() => setChecked('Manager')}
                        />
                        <Text variant="titleMedium" style={styles.radio}>Manager</Text>
                      </View>
                      <View style={{ flexDirection: 'row',  paddingLeft:20,paddingTop:10 }}>
                        <RadioButton
                          color='#90D7B4'
                          status={ checked === 'ProjectChef' ? 'checked' : 'unchecked' }
                          onPress={() => setChecked('ProjectChef')}
                        />
                        <Text variant="titleMedium" style={styles.radio}>Chef de projet</Text>
                      </View>
                      {checked === "ProjectChef" ? (
                        <View style={{flexDirection:"column",paddingTop:0}}>
                          <View style={{flexDirection:"row", paddingLeft:30}}>
                            <Text variant="titleSmall" style={styles.radio}>Selectionnez votre manager :</Text>
                          </View>
                          <View style={{flexDirection:"column", paddingLeft:60}}>
                            {renderManagers()}
                          </View>
                        </View>
                      ) : []}
                    </View>
                    <View style={{ justifyContent: 'center', alignItems:"center"}}>
                    {disabled ? (
                      <Button style={styles.button} disabled={true} icon="alert" mode="contained">
                        Tout les champs ne sont pas remplis...
                      </Button>) : []
                    }
                    {!disabled && password === copyPassword ? (
                      <Button style={styles.button} labelStyle={{color: '#22577A'}} buttonColor='#90D7B4' icon="clipboard-account-outline" mode="contained" onPress={() => setShowable(true)}>
                        S'INSCRIRE
                      </Button>) : []
                    }
                    {!disabled && password !== copyPassword ? (<Button style={styles.button} disabled={true} icon="alert" mode="contained">
                        Les mots de passe sont différents
                      </Button>) : []}
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
                </ScrollView>
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
    color:"#01796f"
  },
  button: {
    width:300,
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
    textAlign:"center",
    color: '#B22222'
  },
  text_input: {
    margin: 10,
    width:250,
  }
})