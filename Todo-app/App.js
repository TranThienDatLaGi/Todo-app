import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login'
import Main from './Main'
import Add from './Add'
import Edit from './Edit'
import Account from './Account'
import Register from './Register'
import { createContext, useState } from "react"
export let  MyContext = createContext()
export default function App() {
  const Stack = createNativeStackNavigator();
  let [todolist, setTodolist] = useState({});
  return (
     <MyContext.Provider value={{ todolist ,setTodolist}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Add" component={Add} options={{ headerShown: false }} />
          <Stack.Screen name="Edit" component={Edit} options={{ headerShown: false }} />
          <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>
        </NavigationContainer>
      </MyContext.Provider>
  );
}

