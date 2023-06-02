import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,Modal,Button,TextInput} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import OptionUtilisateur from './Page/OptionUtilisateur';
import Jeux from './Page/Jeux';
import InventaireUtilisateur from './Page/InventaireUtilisateur';
import HistoriquePartie from './Page/HistoriquePartie';
import { useState } from 'react';
import Connexion from './Page/Connexion';
import Inscription from './Page/Inscription';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PageInscrisptionConnexion = () => {
  return(
  <Stack.Navigator
  
  >
    <Stack.Screen name="Connexion" component={Connexion} initialParams={Connexion} 
                options={{
                  headerShown: false,
                }}
    />
    <Stack.Screen name="Inscription" component={Inscription} 
                    options={{
                      headerShown: false,
                    }}/>
  </Stack.Navigator>)
}

const PagePrincipale = () => {

  return (
    <Tab.Navigator>
    <Tab.Screen 
    name="Jeux" 
    component={Jeux} 
    options={{
      tabBarIcon: ({ color, size }) => (
        <Image source={require("./assets/joystick.png")} style={{ width: size, height: size, tintColor: color }} />
      ),
    }}
    />
    <Tab.Screen 
    name="Inventaire"
     component={InventaireUtilisateur}
     options={{
      tabBarIcon: ({ color, size }) => (
        <Image source={require("./assets/bag.png")} style={{ width: size, height: size, tintColor: color }} />
      ),
    }}
      />
      <Tab.Screen
      name="AllOption" 
      component={Option}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Image source={require("./assets/Gear.png")} style={{ width: size, height: size, tintColor: color }} />
        ),
      }}
       /> 
    </Tab.Navigator>
  )};


  const Option = () => {
    return (
      <Stack.Navigator
      >
        <Stack.Screen name="Option" component={OptionUtilisateur} />
        <Stack.Screen name="Historique" component={HistoriquePartie} />
      </Stack.Navigator>
    );
  };
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <PagePrincipale />
      ) : (
        <Stack.Navigator >
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="InscriptionConnexion"
            component={PageInscrisptionConnexion}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalText: {
      fontSize: 20,
      marginBottom: 10,
    },
    modalInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      width: '80%',
      borderRadius: 5,
    },
  });
