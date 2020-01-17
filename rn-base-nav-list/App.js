import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import ListScreen from './src/screens/ListScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import PedidosScreen from './src/screens/pedidos/PedidosScreen';
import * as firebase from 'firebase';

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyB4s_WfVA5afPAP3AoLd-geG32DPDSTbT4",
  authDomain: "jumpi-food.firebaseapp.com",
  databaseURL: "https://jumpi-food.firebaseio.com",
  projectId: "jumpi-food",
  storageBucket: "jumpi-food.appspot.com",
  messagingSenderId: "978674036301",
  appId: "1:978674036301:web:089d3049d0b1890681f604",
  measurementId: "G-3XJR5QXG8G"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const navigator = createStackNavigator(
  {
    Scanner: ScannerScreen,
    Pedidos: PedidosScreen,
    Home: HomeScreen,
    Menu: MenuScreen,
    Lista: ListScreen
  },
  {
    initialRouteName: 'Scanner',
    defaultNavigationOptions: {
      title: 'Jumpi Food',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        fontSize: 30,
        flex:1,
      },
    }
  }
);

export default createAppContainer(navigator);
