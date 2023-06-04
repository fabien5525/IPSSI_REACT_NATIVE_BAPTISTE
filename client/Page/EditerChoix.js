import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList,TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function EditerChoix({ navigation, route }) {
    const item = route.params;


    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);

    const [pv, setpv] = useState(item.pv);
    const [force, setforce] = useState(item.force);
    const [vitesse, setvitesse] = useState(item.vitesse);

    const editer = () => {
        console.log(item.id)
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
      });
      
      