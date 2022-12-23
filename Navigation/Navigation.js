// npm i --save @react-navigation/bottom-tabs @react-navigation/native 

import React from 'react'
import { View, Text } from 'react-native'
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
import TaskScreen from '../Screen/TaskScreen';
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
            <Tab.Navigator>
              <Tab.Screen name='Home' component={HomeScreen} />
              <Tab.Screen name='TodoLists' component={TodoListsScreen} />
              <Tab.Screen name='SignOut' component={SignOutScreen} />
              <Stack.Screen name='TodoList' component={TodoListScreen}/>
              <Stack.Screen name='CreateProject' component={CreationProjectScreen}/>
              <Stack.Screen name='ModificationProject' component={ModificationProjectScreen}/>
              <Stack.Screen name='Task' component={TaskScreen}/>
            </Tab.Navigator>
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  )
}
