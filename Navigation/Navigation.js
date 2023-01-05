// npm i --save @react-navigation/bottom-tabs @react-navigation/native 

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TodoListsScreen from '../Screen/TodoListsScreen'
import HomeScreen from '../Screen/HomeScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignUpScreen from '../Screen/SignUpScreen'
import SignOutScreen from '../Screen/SignOutScreen'
import TodoListScreen from '../Screen/TodoListScreen'
import CreationProjectScreen from '../Screen/CreateProjectScreen'
import ModificationProjectScreen from '../Screen/ModificationProjectScreen';
import { TokenContext } from '../Context/Context'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()     // (permet d'acceder a une page seulement pa un bouton, pas afficher) voir l'image du TP5
//<Stack.screen>     ne pas oublier de l'imoorter

export default function Navigation () {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer>
          {token == null ? (
            <Tab.Navigator>
              <Tab.Screen name='SignIn' component={SignInScreen} />
              <Tab.Screen name='SignUp' component={SignUpScreen} />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator initialRouteName='TodoLists'>
              <Stack.Screen name='TodoLists' component={TodoListsScreen} options={{title:"Vos Projets"}}/>
              <Stack.Screen name='SignOut' component={SignOutScreen} options={{title: "Déconnexion"}}/>
              <Stack.Screen name='TodoList' component={TodoListScreen} options={({route,navigation}) => ({title: route.params.title})}/>
              <Stack.Screen name='CreateProject' component={CreationProjectScreen} options={{title: " Nouveau Projet"}}/>
              <Stack.Screen name='ModificationProject' component={ModificationProjectScreen} options={({route}) => ({title: "Modification de "+ route.params.project[0].title})}/>
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  )
}
