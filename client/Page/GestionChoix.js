import { StyleSheet, Text, View, Image,Modal,Button,TextInput,FlatList,TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';



 export default function GestionChoix({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [allChoice, setChoice] = useState(
        [
            {
                id: 1,
                eventId: 1,
                title: 'Brulure',
                description: 'ça brule',
                pv: "1",
                force: "1",
                vitesse: "1",
            },
            {
                id: 2,
                eventId: 1,
                title: 'Foudre',
                description: 'ça foudroie',
                pv: "1",
                force: "1",
                vitesse: "1",
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
                data={allChoice}
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
