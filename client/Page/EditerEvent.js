import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList,TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function EditerEvent({ navigation, route }) {
    const item = route.params;


    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);
    const [selectedValue, setSelectedValue] = useState(item.niveau);

    const  [NbNiveau, setNbNiveau] = useState([
  
      {
        id: 0,
        name: 'Intro',
        image: 'https://picsum.photos/200/300',
        unlock: true,
      },
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
      {
        id: 3,
        name: 'Niveau 3',
        image: 'https://picsum.photos/200/300',
        unlock: false,
      },
      {
        id: 4,
        name: 'Niveau 4',
        image: 'https://picsum.photos/200/300',
        unlock: false,
      },
      {
        id: 5,
        name: 'Niveau 5',
        image: 'https://picsum.photos/200/300',
        unlock: false,
      },
      {
        id: 6,
        name: 'Niveau Final',
        image: 'https://picsum.photos/200/300',
        unlock: false,
      },
    ]);

    const editer = async() => {
      if (title.trim() !== '' && description.trim() !== '') {
                try {
                  const token = await AsyncStorage.getItem('token');

                  const response = await fetch(`http://5525.fr:19001/event/${item.id}`, {
                    method: 'PUT',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      title: title,
                      type: "determiner",
                      description: description,
                      level: selectedValue,
                    }),
                  });
            
                  if (response.ok) {
                    navigation.goBack();
                  } else {
                    console.log('Erreur lors de l\'ajout de l\'événement');
                  }
                } catch (error) {
                  console.log('Erreur lors de la requête API :', error);
                }
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
    
    
            <Button title="Editer un évenement" onPress={editer} />
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
      
      