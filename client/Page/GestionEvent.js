import { StyleSheet, Text, View, Image,Modal,Button,TextInput,FlatList,TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function GestionEvent({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [allEvent, setEvent] = useState(
        [
            {
                id: 1,
                type: 'determiner',
                title: 'la Baguette',
                description: 'Rencontre avec un marchand qui vend des baguette de pain',
                niveau: 1,
            },
            {
                id: 2,
                type: 'determiner',
                title: 'Combat contre le Dieu Eternelle des Abysse',
                description: `Vous venez d'avoir votre baguette de pain, vous vous retrouvez face au Dieu Eternelle des Abysse, il vous attaque avec son attaque ultime, vous avez 2 choix, soit vous l'attaquez avec votre baguette de pain, soit vous vous enfuyez`,
                niveau: 2,
            },
            
        ])


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
    console.log(id)
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
