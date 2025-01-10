import { View,Text,StyleSheet } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Authcontextprovider from './contextstore';
import { Authcontext } from './contextstore';
import { useContext } from 'react';
import Welcomescreen from "./screens/welcomescreen";
import Loginscreen from "./screens/login";
import Signupscreen from "./screens/signup";
import Home from "./screens/home";
import Profile from "./screens/profile";
import Notification from "./screens/notification";
import Result from "./screens/result";
import Adminpage from "./screens/admin";
import Adminpanel from "./screens/adminpanel";
import Allstudent from "./screens/allstudent";
import Addnotification from "./screens/addnotification";
import Timetable from "./screens/timetablehandel";
import AddResult from "./screens/resulthandel";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function Stackscreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcomescreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Loginscreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signupscreen} options={{ headerShown: false }} />
      <Stack.Screen name="adminlogin" component={Adminpage} options={{ headerShown: false }}/>
      <Stack.Screen name="adminpanel" component={Adminpanel} options={{ headerShown: false }} />
      <Stack.Screen name="allstudent" component={Allstudent} options={{ headerShown: false }} />
      <Stack.Screen name="addnotification" component={Addnotification} options={{ headerShown: false }} /> 
      <Stack.Screen name="timetable" component={Timetable} />
      <Stack.Screen name="addresult" component={AddResult} /> 
    
    </Stack.Navigator>
  );
}
function Bottomtabscreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#1DB954',
        tabBarInactiveTintColor: '#A0A0A0',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
        }}
        
      />
       <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="notifications" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Result"
        component={Result}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="podium" size={28} color={color} />,
        }}
      />
         <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
function Displayscreen() {
  const authctx = useContext(Authcontext);
  return (
    <NavigationContainer>
      {!authctx.isauthtoken && <Stackscreens />}
      {authctx.isauthtoken && <Bottomtabscreen />}
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <Authcontextprovider>
      <StatusBar style="light" />
      <Displayscreen />
    </Authcontextprovider>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 10,
    backgroundColor: '#1C1C1C',
    borderRadius: 15,
    height: 60,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    paddingBottom: 8,
  },
});