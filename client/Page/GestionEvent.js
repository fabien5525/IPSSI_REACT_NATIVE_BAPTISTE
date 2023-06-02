import { StyleSheet, Text, View, Image,Modal,Button,TextInput,FlatList } from 'react-native';
import { useState } from 'react';

import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function GestionEvent() {
    const [modalVisible, setModalVisible] = useState(false);
    const [allEvent, setEvent] = useState(
        [
            {
                id: 1,
                type: 'determiner',
                title: 'RencontreBaguette',
                description: 'Rencontre avec un marchand de baguette',
                niveau: 1,
            },
            {
                id: 2,
                type: 'determiner',
                title: 'TaperDieuEternelleAbysse',
                description: 'Taper Dieu Eternelle des Abysse',
                niveau: 2,
            },
            
        ])

const  modalDetail = () => {
    setModalVisible(true);
}
    const renderEvent = ({ item }) => { 
        return (
            <View style={styles.itemList}>
                <Text>
                    {item.title}
                </Text>
                <IconButton
      icon={() => <Icon name="info-circle" size={20} color="blue" />}
      onPress={() => modalDetail()}
                />
                <IconButton
      icon={() => <Icon name="edit" size={20} color="green" />}
                          onPress={() => edit()}/>
                <IconButton
                    icon={() => <Icon name="trash" size={20} color="black" />}
                    onPress={() => supprimer()}/>
            </View>
        )
    } 
    return (
        <View>
            <FlatList
                data={allEvent}
                renderItem={renderEvent}
/>                

        </View>
    )
}

const styles = StyleSheet.create({
    itemList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
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
        modalText: {
        fontSize: 20,
        marginBottom: 10,
        },
    })
