import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View , Button, Pressable, FlatList, Image } from 'react-native';

export default function Jeux() {
    const [max, setMax] = useState(1);

    const [level, setLevel] = useState([]);

    const [allevel, setAllevel] = useState(
        [
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
        ])
  
    const handleGoToLevel = (levelAct) => {
        console.log(levelAct);
    }

    const renderLevelUnlock = ({ item }) => {
        return item.unlock ? (
          <Pressable onPress={() => handleGoToLevel(item)} style={styles.level}>
            <View style={styles.cardContainer}>
              <Image source={{ uri: item.image }} style={styles.thumbnailImage} />
              <View style={styles.userInfoContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
              </View>
            </View>
          </Pressable>
        ) : (
          <View style={styles.level}>
            <View style={styles.cardContainer}>
              <Image source={require("../assets/lock.webp")} style={styles.thumbnailImage} />
              <View style={styles.userInfoContainer}>
                <Text style={styles.nameText}>Niveau verouillé</Text>
              </View>
            </View>
          </View>
        );
      };
      

  return (
    <View style={styles.container}>
      <Text>Niveau {max}</Text>
      <View style={styles.leveldesign}>

      <FlatList
              data={allevel}
              renderItem={renderLevelUnlock}
              keyExtractor={(item) => item.id.toString()}/>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leveldesign: {
    flex: 1,
    width: '90%',
    backgroundColor: '#d7c2c2',
  },
  bouton: {
    flex: 1,
    width: '90%',
    backgroundColor: '#d7c2c2',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  thumbnailImage: {
    width: 50,
    height: 50,
    borderRadius: 40, // Pour obtenir une image ronde
    marginRight: 16,
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
    level: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
    },
});
