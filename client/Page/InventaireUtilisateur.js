import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';

export default function InventaireUtilisateur() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/ad.jpg')}resizeMode="contain" />
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.circleHP}>
            <Text style={styles.text}>HP: 1</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.circleSTR, styles.circleMiddle]}>
            <Text style={styles.text}>STR: 2</Text>
          </View>
          <View style={styles.circleVIT}>
            <Text style={styles.text}>VIT: 3</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleVIT: {
    width: 90,
    height: 90,
    borderRadius: 325,
    backgroundColor: 'yellow',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleSTR: {
    width: 90,
    height: 90,
    borderRadius: 325,
    backgroundColor: 'red',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleHP: {
    width: 90,
    height: 90,
    borderRadius: 325,
    backgroundColor: 'green',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleMiddle: {
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 1000,
    width:"90%",
    height:"50%",  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
