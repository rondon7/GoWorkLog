import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './components/Login';
import Signup from './components/Signup';
import DashboardOptions from './components/DashboardOptions';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCp2nZgxv0dDUqccTdJensCEm2lKZN6jmM",
  authDomain: "goworklog-2a7ff.firebaseapp.com",
  databaseURL: "https://goworklog-2a7ff.firebaseio.com",
  projectId: "goworklog-2a7ff",
  storageBucket: "goworklog-2a7ff.appspot.com",
  messagingSenderId: "1079049916295",
  appId: "1:1079049916295:android:b5ec9382fca30a54bb0d22"
};

const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <MyStack />
  );
}

const MyStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
        />
        <Stack.Screen
          name="DashboardOptions"
          component={DashboardOptions}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};