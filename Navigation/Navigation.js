import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, Link } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import logo from '../images/todovlop.png'


import TodoListsScreen from '../Screen/TodoListsScreen'
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
import { title } from 'process';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()     // (permet d'acceder a une page seulement pa un bouton, pas afficher) voir l'image du TP5
//<Stack.screen>     ne pas oublier de l'imoorter

export default function Navigation () {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer style={{backgroundColor:"#EBF7F3"}}>
          {token == null ? (
            <Tab.Navigator>
              <Tab.Screen name='SignIn' component={SignInScreen} />
              <Tab.Screen name='SignUp' component={SignUpScreen} />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator initialRouteName='TodoLists'>
              <Stack.Screen name='TodoLists' component={TodoListsScreen} options={{headerTitle:() => <Image source={logo} style={{ width: 400, height: 100, paddingTop: 10 }}/>, headerRight:() => <Link to={{ screen: "ProfilScreen"}} style={{paddingRight:22,paddingTop:10}}><FontAwesomeIcon icon={faUser}/></Link>,headerStyle:{height:130,backgroundColor: "#EBF7F3"}}}/>
              <Stack.Screen name='ProfilScreen' component={ProfilScreen} options={{title: "Votre Profil",headerStyle:{height:130,backgroundColor: "#EBF7F3"}}}/>
              <Stack.Screen name='TodoList' component={TodoListScreen} options={({route,navigation}) => ({headerTitle:() => <Image source={logo} style={{ width: 275, height: 250 }}/>,headerStyle:{height:130,backgroundColor: "#EBF7F3"},headerRight:() => <Link to={{ screen: "ProfilScreen"}} style={{paddingRight:22,paddingTop:10}}><FontAwesomeIcon icon={faUser}/></Link>,headerStyle:{height:130,backgroundColor: "#EBF7F3"}})}/>
              <Stack.Screen name='CreateProject' component={CreationProjectScreen} options={{headerTitle:() => <Image source={logo} style={{ width: 275, height: 250 }}/>,headerRight:() => <Link to={{ screen: "ProfilScreen"}} style={{paddingRight:22,paddingTop:10}}><FontAwesomeIcon icon={faUser}/></Link>,headerStyle:{height:130,backgroundColor: "#EBF7F3"}}}/>
              <Stack.Screen name='ModificationProject' component={ModificationProjectScreen} options={({route}) => ({headerTitle:() => <Image source={logo} style={{ width: 275, height: 250 }}/>,headerStyle:{height:130,backgroundColor: "#EBF7F3"},headerRight:() => <Link to={{ screen: "ProfilScreen"}} style={{paddingRight:22,paddingTop:10}}><FontAwesomeIcon icon={faUser}/></Link>,headerStyle:{height:130,backgroundColor: "#EBF7F3"}})}/>
              <Stack.Screen name='ModificationTask' component={ModificationTaskScreen} options={({route}) => ({title: "Modification de la tâche "+route.params.task.content,headerStyle:{height:130,backgroundColor: "#EBF7F3"}})}/>
              <Stack.Screen name='CreateTask' component={CreationTaskScreen} options={({route}) => ({headerTitle:() => <Image source={logo} style={{ width: 275, height: 250 }}/>,headerStyle:{height:130,backgroundColor: "#EBF7F3"},headerRight:() => <Link to={{ screen: "ProfilScreen"}} style={{paddingRight:22,paddingTop:10}}><FontAwesomeIcon icon={faUser}/></Link>,headerStyle:{height:130,backgroundColor: "#EBF7F3"}})}/> 
              <Stack.Screen name='Task' component={TaskScreen} options={({route}) => ({headerTitle:() => <Image source={logo} style={{ width: 275, height: 250 }}/>,headerStyle:{height:130,backgroundColor: "#EBF7F3"},headerRight:() => <Link to={{ screen: "ProfilScreen"}} style={{paddingRight:22,paddingTop:10}}><FontAwesomeIcon icon={faUser}/></Link>,headerStyle:{height:130,backgroundColor: "#EBF7F3"}})}/>
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  )
}
