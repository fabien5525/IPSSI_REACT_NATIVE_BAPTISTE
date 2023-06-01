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

  // Function to toggle the modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <NavigationContainer>
      {showModal ? (
        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Identifiant</Text>
            <TextInput placeholder="Username" style={styles.modalInput} />

            <Text style={styles.modalText}>Mot de passe</Text>
            <TextInput placeholder="Password" style={styles.modalInput} />

            <Button title="Se connecter" style={styles.modalButton} onPress={toggleModal}/>
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
