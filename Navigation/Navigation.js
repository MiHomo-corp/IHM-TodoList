import React from 'react'
import {View, Image,useWindowDimensions } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, Link } from '@react-navigation/native'
import { IconButton } from 'react-native-paper';

import ProjectsScreen from '../Screen/ProjectsScreen'
import ProfilScreen from '../Screen/ProfilScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignUpScreen from '../Screen/SignUpScreen'
import TodoListScreen from '../Screen/TodoListScreen'
import CreationProjectScreen from '../Screen/CreateProjectScreen'
import ModificationProjectScreen from '../Screen/ModificationProjectScreen';
import CreationTaskScreen from '../Screen/CreateTaskScreen'
import ModificationTaskScreen from '../Screen/ModificationTaskScreen';
import TaskScreen from '../Screen/TaskScreen';
import { TokenContext } from '../Context/Context'
import logo from '../images/todovlopHeaderTest.png'

const Stack = createStackNavigator()    

export default function Navigation () {

  const {height, width} = useWindowDimensions();
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer style={{backgroundColor:"#EBF7F3"}}>
          {token == null ? (
            <Stack.Navigator>
              <Stack.Screen 
                name='SignIn' 
                component={SignInScreen} 
                options={{title:"",headerShown:null}}/>
              <Stack.Screen 
                name='SignUp' 
                component={SignUpScreen} 
                options={{title:"",headerShown:null}}/>
            </Stack.Navigator>
          ) : (
            <Stack.Navigator initialRouteName='Projects'>
              <Stack.Screen 
                name='Projects' 
                component={ProjectsScreen} 
                options={{
                  headerTitle:() => <View style={{}}><Image source={logo} style={{width:width/1.40,height:height/10}}/></View>, 
                  headerRight:() => <Link to={{ screen: "ProfilScreen"}} style={{paddingRight:15}}><IconButton icon="account" iconColor= '#22577A' containerColor='#90D7B4' mode="contained"/></Link>,
                  headerStyle:{height:130,backgroundColor: "#EBF7F3"}}}/>
              <Stack.Screen 
                name='ProfilScreen' 
                component={ProfilScreen} 
                options={{
                  headerTitle:() => <Image source={logo} style={{ width: width/1.35, height: height/10}}/>,
                  headerStyle:{height:130,backgroundColor: "#EBF7F3"}}}/>
              <Stack.Screen 
                name='TodoList' 
                component={TodoListScreen} 
                options={{
                  headerTitle:() => <Image source={logo} style={{ width: width/1.75, height: height/13}}/>, 
                  headerRight:() => <Link to={{ screen: "ProfilScreen"}} style={{paddingRight:15}}><IconButton icon="account" iconColor= '#22577A' containerColor='#90D7B4' mode="contained"/></Link>,
                  headerStyle:{height:130,backgroundColor: "#EBF7F3"}}}/>
              <Stack.Screen 
                name='CreateProject' 
                component={CreationProjectScreen} 
                options={{
                  headerTitle:() => <Image source={logo} style={{ width: width/1.75, height: height/13}}/>,
                  headerRight:() => <Link to={{ screen: "ProfilScreen"}} style={{paddingRight:15}}><IconButton icon="account" iconColor= '#22577A' containerColor='#90D7B4' mode="contained"/></Link>,
                  headerStyle:{height:130,backgroundColor: "#EBF7F3"}}}/>
              <Stack.Screen 
                name='ModificationProject' 
                component={ModificationProjectScreen} 
                options={{
                  headerTitle:() => <Image source={logo} style={{ width: width/1.75, height: height/13}}/>,
                  headerRight:() => <Link to={{ screen: "ProfilScreen"}} style={{paddingRight:15}}><IconButton icon="account" iconColor= '#22577A' containerColor='#90D7B4' mode="contained"/></Link>,
                  headerStyle:{height:130,backgroundColor: "#EBF7F3"}}}/>
              <Stack.Screen 
                name='ModificationTask' 
                component={ModificationTaskScreen} 
                options={{
                  headerTitle:() => <Image source={logo} style={{ width: width/1.75, height: height/13}}/>,
                  headerRight:() => <Link to={{ screen: "ProfilScreen"}} style={{paddingRight:15}}><IconButton icon="account" iconColor= '#22577A' containerColor='#90D7B4' mode="contained"/></Link>,
                  headerStyle:{height:130,backgroundColor: "#EBF7F3"}}}/>
              <Stack.Screen 
                name='CreateTask' 
                component={CreationTaskScreen} 
                options={{
                  headerTitle:() => <Image source={logo} style={{ width: width/1.75, height: height/13}}/>,
                  headerRight:() => <Link to={{ screen: "ProfilScreen"}} style={{paddingRight:15}}><IconButton icon="account" iconColor= '#22577A' containerColor='#90D7B4' mode="contained"/></Link>,
                  headerStyle:{height:130,backgroundColor: "#EBF7F3"}}}/>
              <Stack.Screen
                name='Task' 
                component={TaskScreen} 
                options={{
                  headerTitle:() => <Image source={logo} style={{ width: width/1.75, height: height/13}}/>,
                  headerRight:() => <Link to={{ screen: "ProfilScreen"}} style={{paddingRight:15}}><IconButton icon="account" iconColor= '#22577A' containerColor='#90D7B4' mode="contained"/></Link>,
                  headerStyle:{height:130,backgroundColor: "#EBF7F3"}}}/>
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  )
}