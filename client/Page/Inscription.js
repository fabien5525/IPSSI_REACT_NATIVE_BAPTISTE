import { StyleSheet, Text, View, Image, Modal, Button, TextInput, FlatList, Pressable } from 'react-native';
import { useState } from 'react';

export default function Inscription({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [email, setEmail] = useState('');
  const [image, setImage] = useState('https://picsum.photos/200/300');
  const [selectedImageId, setSelectedImageId] = useState(null);

  const avatarDispo = [
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/400',
    'https://picsum.photos/200/500',
    'https://picsum.photos/200/500',
    'https://picsum.photos/200/500',
    'https://picsum.photos/200/500',
    'https://picsum.photos/200/500',
    'https://picsum.photos/200/500'
  ];

  const GoToConnexion = () => {
    navigation.navigate('Connexion')
  }

  const renderDisplayImage = ({ item, index }) => {
    return (
      <Pressable key={index} onPress={() => setImage(item)}>
        <Image source={{ uri: item }}
          style={[
            styles.thumbnailImage,
            selectedImageId === item.id && styles.highlightedImage,
          ]} />
      </Pressable>
    )
  }

  const VerificationInsciption = async () => {
    const req = await fetch('http://5525.fr:19001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password, email: email, image: image }),
    });
    const status = await req.status;
    const res = await req.json();

    if (status === 200) {
      alert('Inscription réussi');
      navigation.navigate('Connexion');
    } else {
      alert(res.message);
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.modalText}>Identifiant</Text>
      <TextInput
        placeholder="Username"
        style={styles.modalInput}
        onChangeText={(text) => setUsername(text)}
      />

      <Text style={styles.modalText}>Mot de passe </Text>
      <TextInput
        placeholder="password"
        style={styles.modalInput}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.modalText}>Confirmation mot de passe</Text>
      <TextInput
        placeholder="password"
        style={styles.modalInput}
        onChangeText={(text) => setPasswordConfirm(text)}
      />

      <Text style={styles.modalText}>E-mail</Text>
      <TextInput
        placeholder="email"
        style={styles.modalInput}
        onChangeText={(text) => setEmail(text)}
      />

      <View style={styles.bloc}>
        <Text style={styles.modalText}>Image de profile</Text>
        <FlatList
          horizontal={true}
          data={avatarDispo}
          renderItem={renderDisplayImage}
          keyExtractor={(item) => item.id.toString()} />
      </View>

      <View style={styles.LesBoutons}>
        <Button title="Se connecter" style={styles.modalButton} onPress={() => GoToConnexion()} />
        <Button title="S'inscrire" style={styles.modalButton} onPress={() => VerificationInsciption()} />
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

  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '80%',
    borderRadius: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
  },
  thumbnailImage: {
    width: 50,
    height: 50,
    borderRadius: 40, // Pour obtenir une image ronde
    marginRight: 16,
  },

  LesBoutons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  bloc: {
    alignItems: 'center',
    maxHeight: 100, // Hauteur minimale nécessaire pour afficher les images de profil
  },
  flatListContentContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  highlightedImage: {
    borderWidth: 2,
    borderColor: 'blue',
  },
});