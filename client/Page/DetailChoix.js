import { StyleSheet, Text, View, Image,Modal,Button,TextInput,FlatList } from 'react-native';

export default function DetailChoix({navigation, route }) {
    const event = route.params;
    console.log(event)
    return (
        <View style={styles.info}>
            <Text>
                {event.id}
            </Text>

            <Text>
                {event.type}
            </Text>

            <Text>
                {event.title}
            </Text>
            
            <Text>
                {event.effectTitle}
            </Text>
            <Text>
                {event.description}
            </Text>
            <Text>
            {event.pv}
            </Text>
            <Text>
            {event.force}
            </Text>
            <Text>
            {event.vitesse}
            </Text>
        </View>
    )}
const styles = StyleSheet.create({
    info: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }})