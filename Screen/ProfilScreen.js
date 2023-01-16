import React, {useState} from 'react'
import { View, ScrollView, StyleSheet} from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
import { Button, Text } from 'react-native-paper';

import { HierarchyContext, TokenContext, UsernameContext } from '../Context/Context'
import Profil from '../components/Profil'; 

export default function ProfilScreen () {

  const [showable,setShowable] = useState(false)

  return (
    <View style={styles.container}>
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
            {([username, setUsername]) => (
              <HierarchyContext.Consumer>
                {([hierarchy, setHierarchy]) => {
                  return (
                    <ScrollView>
                      <Profil hierarchy={hierarchy} username={username} token={token} />
                      <AwesomeAlert
                        show={showable}
                        title="Vous partez ?"
                        message="Etes-vous sur de vouloir vous déconnectez?"
                        showCancelButton={true}
                        showConfirmButton={true}
                        closeOnTouchOutside={false}
                        cancelText="Rester"
                        confirmText="Confirmer"
                        confirmButtonColor="#90D7B4"
                        cancelButtonColor="#01796f"
                        onCancelPressed={() => {
                          setShowable(false);
                        }}
                        onConfirmPressed={() => {
                          setHierarchy(null); setToken(null); 
                        }}/>
                        <Button style={{marginHorizontal:35,marginVertical:50}} labelStyle={{color: '#22577A'}} buttonColor='#90D7B4' icon="logout" mode="contained" onPress={() => setShowable(true)}>
                          <Text style={{color: '#22577A',fontWeight:"bold",textTransform: 'uppercase'}}> DÉCONNEXION</Text>
                        </Button>
                    </ScrollView>
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