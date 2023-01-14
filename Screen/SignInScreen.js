import React from 'react'
import { View } from 'react-native'
import { Text } from "react-native-paper"
import { Link } from '@react-navigation/native'

import SignIn from '../components/SignIn'

export default function SignInScreen () {
  return (
    <View
      style={{
        backgroundColor:"#EBF7F3",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <SignIn/>
      <Text variant='bodyLarge' style={{ marginTop:25, color:"#22577A"}}>
        Ou s'inscrire{' '}
        <Link
          style={{ fontWeight:  'bold',color:"#01796F" }}
          to={{ screen: 'SignUp' }}
        >
          ici
        </Link>
      </Text>
    </View>
  )
}
