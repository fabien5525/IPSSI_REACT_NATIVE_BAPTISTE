import { StyleSheet, Text, View, Image,Modal,Button,TextInput} from 'react-native';

import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Connexion({navigation, setIsLoggedInCallback }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

    const VerificationLogin = async() => {
      const req = await fetch('http://5525.fr:19001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: password }),
        })
        const status = await req.status;
        const res = await req.json();
    
        if (status === 200) {
          await AsyncStorage.setItem('token', res.token);
          setIsLoggedInCallback(true);
                } else {
          alert(res.message);
        }
      };
      const getEncodedData = async () => {
        try {
          const encodedData = await AsyncStorage.getItem('token');
          if (encodedData !== null) {
            // La valeur existe, vous pouvez la traiter
            console.log(encodedData);
          } else {
            // La valeur n'existe pas
            console.log('Aucune valeur stockée avec la clé "token"');
          }
        } catch (error) {
          console.log('Erreur lors de la récupération des données :', error);
        }
      };

      console.log(getEncodedData())    

      const handleGoToInscription = () => {
        navigation.navigate('Inscription')
    }

    const Pass = () => {
      setIsLoggedInCallback(true);
    }

    return(
        <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Email</Text>
        <TextInput 
        placeholder="Email"
        style={styles.modalInput} 
        onChangeText={(text) => setEmail(text)}
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

        <Button title="Pass" style={styles.modalButton} onPress={() => Pass()}/>

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