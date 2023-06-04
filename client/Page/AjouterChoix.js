import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList,TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AjouterChoix = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pv, setpv] = useState("1");

    const [force, setforce] = useState("1");

    const [vitesse, setvitesse] = useState("1");



  const [selectedValue, setSelectedValue] = useState(1);


const [ListeDeChoix, setListeDeChoix] = useState([

]);
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
  };

  const addchoice = () => {
    if (title.trim() !== '' && description.trim() !== '') {
        const addchoice = async () => {
            if (title.trim() !== '' && description.trim() !== '') {
              try {
                const response = await fetch('FerchAjouter/events', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    title: title,
                    description: description,
                  }),
                });
          
                if (response.ok) {
                  const newEvent = await response.json();
                  setEvents(prevEvents => [...prevEvents, newEvent]);
                  setTitle('');
                  setDescription('');
                } else {
                  console.log('Erreur lors de l\'ajout de choix');
                }
              } catch (error) {
                console.log('Erreur lors de la requête API :', error);
              }
            }
          };
          
      setTitle('');
      setDescription(''); 
    }
  };


  return (
    <View style={styles.container}>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="titre du choix"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="description du choix"
          value={description}
          onChangeText={text => setDescription(text)}
        />
<View style={styles.NumContainer}>
<TextInput
        style={styles.NumericInput}
        value={pv}
        onChangeText={number => setpv(number)}
        keyboardType="numeric" // Utiliser le clavier numérique
        placeholder="PV"
      />

<TextInput
        style={styles.NumericInput}
        value={force}
        onChangeText={number => setforce(number)}
        keyboardType="numeric" // Utiliser le clavier numérique
        placeholder="Force"
      />

<TextInput
        style={styles.NumericInput}
        value={vitesse}
        onChangeText={number => setvitesse(number)}
        keyboardType="numeric" // Utiliser le clavier numérique
        placeholder="Vitesse"
      />
      </View>

        <Button title="Ajouter un choix" onPress={addchoice} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  list: {
    flex: 1,
  },
  lvlpicker: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,

  },
  NumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  NumericInput: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 16,
  },

  eventContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDescription: {
    marginBottom: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonLabel: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AjouterChoix;
