import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable, FlatList, Image } from 'react-native';

export default function Jeux({ navigation }) {
  const [max, setMax] = useState(1);

  const [level, setLevel] = useState([]);

  const [allevel, setAllevel] = useState([
    {
      id: 0,
      name: 'Intro',
      image: 'https://picsum.photos/200/300',
      unlock: true,
    },
    {
      id: 1,
      name: 'Niveau 1',
      image: 'https://picsum.photos/200/400',
      unlock: true,
    },
    {
      id: 2,
      name: 'Niveau 2',
      image: 'https://picsum.photos/200/500',
      unlock: false,
    },
    {
      id: 3,
      name: 'Niveau 3',
      image: 'https://picsum.photos/200/600',
      unlock: false,
    },
    {
      id: 4,
      name: 'Niveau 4',
      image: 'https://picsum.photos/200/700',
      unlock: false,
    },
    {
      id: 5,
      name: 'Niveau 5',
      image: 'https://picsum.photos/200/800',
      unlock: false,
    },
    {
      id: 6,
      name: 'Niveau Final',
      image: 'https://picsum.photos/200/900',
      unlock: false,
    },
  ])

  const handleGoToLevel = (levelAct) => {
    navigation.navigate('Niveau', levelAct);
  }

  const renderLevelUnlock = ({ item }) => {
    return (
      <Pressable onPress={() => item.unlock && handleGoToLevel(item)}>
        <View style={{
          flex: 1,
          width: 300,
          height: 100,
          margin: 10,
          padding: 10,
          backgroundColor: item.unlock ? '#ccc' : '#aaa',
          borderRadius: 25,
          flexDirection: 'row',
        }}>
          <Image
            style={{
              width: 80,
              height: 80,
              borderRadius: 25
            }}
            source={item.unlock ? { uri: item.image } : require("../assets/lock.webp")}
          />
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 30,
            marginLeft: 20,

          }}>{item.name}</Text>
        </View>
      </Pressable>
    )
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50,
    }}>
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
      }}>Niveau {max}</Text>
      <View>
        <FlatList
          data={allevel}
          renderItem={renderLevelUnlock}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({

});
