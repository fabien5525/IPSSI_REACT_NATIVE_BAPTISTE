import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList,TouchableOpacity } from 'react-native';

const EventScreen = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddEvent = () => {
    // Code pour gérer l'action du bouton "+" ici
  };

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
                const response = await fetch('URL_DE_VOTRE_API/events', {
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
      <Text style={styles.title}>Event Management</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter level"
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <Button title="Add Event" onPress={addEvent} />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>
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

export default EventScreen;
