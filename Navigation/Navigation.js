import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, Link,useNavigation} from '@react-navigation/native'
import { IconButton } from 'react-native-paper';
/*import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'*/

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

const Stack = createStackNavigator() 
//const navigation = useNavigation() onPress={() => navigation.navigate("ProfilScreen")}*/
// (permet d'acceder a une page seulement pa un bouton, pas afficher) voir l'image du TP5
//<Stack.screen>     ne pas oublier de l'imoorter

export default function Navigation () {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer>
          {token == null ? (
            <Stack.Navigator>
              <Stack.Screen name='SignIn' component={SignInScreen} options={{title:"",headerShown:null,}}/>
              <Stack.Screen name='SignUp' component={SignUpScreen} options={{title:"",headerShown:null,}}/>
            </Stack.Navigator>
          ) : (
            <Stack.Navigator initialRouteName='TodoLists'>
              <Stack.Screen name='TodoLists' component={TodoListsScreen} options={{title:"Vos Projets", headerRight:() =>  <Link to={{ screen: "ProfilScreen"}} style={{paddingRight:15}}><IconButton icon="account" iconColor= '#22577A' containerColor='#90D7B4' mode="contained"/></Link>}}/>
              <Stack.Screen name='ProfilScreen' component={ProfilScreen} options={{title: "Votre Profil"}}/>
              <Stack.Screen name='TodoList' component={TodoListScreen} options={({route,navigation}) => ({title: route.params.title})}/>
              <Stack.Screen name='CreateProject' component={CreationProjectScreen} options={{title: ""}}/>
              <Stack.Screen name='ModificationProject' component={ModificationProjectScreen} options={({route}) => ({title: "Modification de "+ route.params.project[0].title})}/>
              <Stack.Screen name='ModificationTask' component={ModificationTaskScreen} options={({route}) => ({title: "Modification de la tâche "+route.params.task.content})}/>
              <Stack.Screen name='CreateTask' component={CreationTaskScreen} options={{title: ""}}/> 
              <Stack.Screen name='Task' component={TaskScreen} options={({route}) => ({title:route.params.title})}/>
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  )
}
