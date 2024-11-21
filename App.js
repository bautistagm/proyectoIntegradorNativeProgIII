import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/screens/Login';
import Home from './src/components/screens/Home'
const Stack = createNativeStackNavigator();

export default function App() {  
  return (
      <NavigationContainer>
        <Stack.Navigator>
           <Stack.Screen name="Login" component={ Login }  options={ { headerShown: false } }/>
           <Stack.Screen name="Home" component={ Home } options={ { headerShown: false } }/>
        </Stack.Navigator>
      </NavigationContainer>
   )
}