import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList,TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function EditerChoix({ navigation, route }) {
    const item = route.params;


    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);

    const [pv, setpv] = useState(item.pv);
    const [force, setforce] = useState(item.force);
    const [vitesse, setvitesse] = useState(item.vitesse);

    const [effectTitle, seteffectTitle] = useState(item.EffectTitle);


    const [ListeDesEvent, setListeDesEvent] = useState([
        {
            id: 1,
            type: 'event',
            title: 'event 1',
            description: 'description event 1',
            niveau: 1,
            image: 'https://picsum.photos/200/300',
            unlock: true,
        },
    ]);

    const [selectedValue, setSelectedValue] = useState(0);
    

    useEffect(() => {
        const getEvents = async () => {
            try {
                const response = await fetch('http://5525.fr:19001/event');
                const json = await response.json();
                setListeDesEvent(json);
            } catch (error) { 
                console.log('Erreur lors de la requête API :', error);
            }
        };
      }, []
    );
    const editer = () => {

        if (title.trim() !== '' && description.trim() !== '') {
            const editer = async () => {
                if (title.trim() !== '' && description.trim() !== '') {
                    try {
                      const token = await AsyncStorage.getItem('token');
                        const response = await fetch('http://5525.fr:19001/choice/' + item.id, {
                            method: 'PUT',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              title: title,
                              effect: [
                                {
                                  title: effectTitle,
                                  description: description,
                                  health: parseInt(pv),
                                  strength: parseInt(force),
                                  speed: parseInt(vitesse)
                                }
                              ]
                            }),
                        });
                        const json = await response.json();
                        console.log(json);
                        navigation.navigate('ListeChoix');
                    } catch (error) {
                        console.log('Erreur lors de la requête API :', error);
                    }
                }
            };
            }
          }

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
              placeholder="description de l'effet du choix"
              value={description}
              onChangeText={text => setDescription(text)}
            />

<TextInput
              style={styles.input}
              placeholder="titre de l'effet du choix"
              value={title}
              onChangeText={text => setEffectTitle(text)}
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
      <Picker
  style={styles.lvlpicker}
  mode="dropdown"
  selectedValue={selectedValue}
  onValueChange={(itemValue) => setSelectedValue(itemValue)}
>
  {ListeDesEvent.map((item, index) => {
    return (
      <Picker.Item
        label={item.title}
        value={item.id}
        key={index}
      />
    );
  })}
</Picker>
            <Button title="Editer un choix" onPress={editer} />
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
      