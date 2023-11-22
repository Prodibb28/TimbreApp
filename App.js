import React, { useState, useEffect} from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from './src/config/config';

import Login from './src/screen/Login';
import SingUp from './src/screen/SingUp';
import Home from './src/screen/Home';

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
   }

   useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing) return null;

  if(!user){
  return(
    <Stack.Navigator
    screenOptions={{headerShown: false}}
    >

      <Stack.Screen 
       name="Login" 
       component={Login} 
      /> 
      <Stack.Screen 
       name="SingUp" 
       component={SingUp} 
      /></Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator
    screenOptions={{headerShown: false}}>
      <Stack.Screen 
       name="Home" 
       component={Home} 
      /> 
    </Stack.Navigator>
  );
}

export default() => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}
