import { StyleSheet, Text, View, Image,Modal,Button,TextInput,FlatList,TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function GestionEvent({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [allEvent, setEvent] = useState([])

        useEffect(() => {
            const getEvent = async () => {
                try {
                    const token = await AsyncStorage.getItem('token');
                    const response = await fetch('http://5525.fr:19001/event', {
                        method: 'GET',
                        headers: {
                          'Authorization': `Bearer ${token}`,
                        },
                    });
                    const json = await response.json();
                    setEvent(json);
                } catch (error) {
                    console.log('Erreur lors de la requête API :', error);
                }
            };
            getEvent();
        }, []);

       

        useEffect(() => {
            console.log(allEvent); // Vérifier la valeur initiale de allEvent
          }, [allEvent]); 

          
const ajouter = () => {
    navigation.navigate('Ajouter')
          };

const  detail = (item) => {
    navigation.navigate('Detail', item )
}
const  edit = (item) => {
    navigation.navigate('Editer', item )
}

const  supprimer = (id) => {

    const deleteEvent = async () => {
        try {
            const response = await fetch('http://5525.fr:19001/event/' + id, {
                method: 'DELETE',
            });
            if (response.ok) {
                setEvent(allEvent.filter(item => item.id !== id));
            } else {
                console.log('Erreur lors de la suppression de l\'événement');
            }
        } catch (error) {
            console.log('Erreur lors de la requête API :', error);
        }
    }
    deleteEvent();
}


    const renderEvent = ({ item }) => { 
        return (
            <View style={styles.itemList}>
                <Text>
                    {item.title}
                </Text>
                <IconButton
      icon={() => <Icon name="info-circle" size={20} color="blue" />}
      onPress={() => detail(item)}
                />
                <IconButton
      icon={() => <Icon name="edit" size={20} color="green" />}
                          onPress={() => edit(item)}/>
                <IconButton
                    icon={() => <Icon name="trash" size={20} color="black" />}
                    onPress={() => supprimer(item.id)}/>
            </View>
        )
    } 
    return (
        <View style={styles.container}>
            <FlatList
                data={allEvent}
                renderItem={renderEvent}
/>                

<TouchableOpacity style={styles.addButton} onPress={ajouter}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    itemList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    })
