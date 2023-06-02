import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OptionUtilisateur() {
  const navigation = useNavigation();

  const handleToHistorique = () => {
    navigation.navigate('Historique');
  };

  handleToGestionEvent = () => {
    navigation.navigate('GestionEvent');
  }


  return (
    <View style={styles.container}>


      <View style={styles.button}>
        <Button title="Gestion des events" onPress={() => handleToGestionEvent()} />
      </View>
      <View style={styles.button}>
        <Button style={styles.button} title="historique des parties" onPress={() => handleToHistorique()} />
      </View>
      <View style={styles.button}>
        <Button style={styles.button} title="modifier mes informations" onPress={() => alert('Changer de mot de passe')} />
      </View>
      <View style={styles.button}>
        <Button style={styles.button} title="Se déconnecter" onPress={() => alert('Se déconnecter')} /></View>
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 20,
    width: 200,
  }
});
