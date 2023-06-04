import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList,TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AjouterEvent = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [selectedValue, setSelectedValue] = useState(1);
const  [NbNiveau, setNbNiveau] = useState([
  
  {
    id: 1,
    name: 'Niveau 1',
    image: 'https://picsum.photos/200/300',
    unlock: true,
  },
  {
    id: 2,
    name: 'Niveau 2',
    image: 'https://picsum.photos/200/300',
    unlock: false,
  },
]);


const [ListeDeChoix, setListeDeChoix] = useState([

]);
  // Chargement initial des événements depuis l'API
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    // Effectuer une requête à l'API pour récupérer les événements
    // et mettre à jour la liste des événements (state events)
  };

  const addEvent = () => {
    if (title.trim() !== '' && description.trim() !== '') {
        const addEvent = async () => {
            if (title.trim() !== '' && description.trim() !== '') {
              try {
                // Effectuer la requête POST à l'API pour ajouter un nouvel événement
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
                  // Mettre à jour la liste des événements avec le nouvel événement
                  setEvents(prevEvents => [...prevEvents, newEvent]);
                  setTitle('');
                  setDescription('');
                } else {
                  console.log('Erreur lors de l\'ajout de l\'événement');
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
          placeholder="titre de l'event"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="description de l'event"
          value={description}
          onChangeText={text => setDescription(text)}
        />

<Picker
  style={styles.lvlpicker}
  mode="dropdown"
  selectedValue={selectedValue}
  onValueChange={(itemValue) => setSelectedValue(itemValue)}
>
  {NbNiveau.map((item, index) => {
    return (
      <Picker.Item
        label={item.name}
        value={item.id}
        key={index}
      />
    );
  })}
</Picker>


        <Button title="Ajouter un évenement" onPress={addEvent} />
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

export default AjouterEvent;
