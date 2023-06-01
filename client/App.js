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



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
  const [showModal, setShowModal] = useState(true); // State to control the visibility of the modal

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Function to toggle the modal
  const VerificationLogin = () => {
    fetch('http://5525.fr:19001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
    .then((response) => {
      const json = response.json();
      if(response.status == 200) {
        console.log(json);
      setShowModal(false);
      } else {
        alert('Identifiant ou mot de passe incorrect')
      }
    })
  };

  return (
    <NavigationContainer>
      {showModal ? (
        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Identifiant</Text>
            <TextInput 
            placeholder="Username"
            style={styles.modalInput} 
            onChangeText={(text) => setUsername(text)}
            />

            <Text style={styles.modalText}>Mot de passe</Text>
            <TextInput 
            placeholder="Password" 
            style={styles.modalInput} 
            onChangeText={(text) => setPassword(text)}
            />

            <Button title="Se connecter" style={styles.modalButton} onPress={() => VerificationLogin()}/>
          </View>
        </Modal>
      ) : (
        <PagePrincipale />
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
