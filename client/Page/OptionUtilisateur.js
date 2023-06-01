import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OptionUtilisateur() {
    const navigation = useNavigation();

    const handleToHistorique = () => {
        navigation.navigate('Historique');
    };


  return (
    <View style={styles.container}>
        

        <Button title="Gestion des events" onPress={() => 
            
            alert('event')
            
            } />
        <Button title="historique des parties" onPress={() => {
            handleToHistorique()
        }
        } />

        <Button title="modifier mes informations" onPress={() => alert('Changer de mot de passe')} />
        <Button title="Se déconnecter" onPress={() => alert('Se déconnecter')} />

              <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
