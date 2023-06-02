import { StyleSheet, Text, View, Image,Modal,Button,TextInput} from 'react-native';

import { useState } from 'react';

export default function Connexion({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

      const handleGoToInscription = () => {
        navigation.navigate('Inscription')
    }

    

    return(
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
        <View style={styles.LesBoutons}>
        <Button title="Se connecter" style={styles.modalButton} onPress={() => VerificationLogin()}/>
        <Button title="S'inscrire" style={styles.modalButton} onPress={() => handleGoToInscription()}/>
        </View>
      </View>
    )
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
    LesBoutons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : 'space-between',
        width: '80%',
        padding: 10,
        borderRadius: 10,
        margin : 10,
        },
  });