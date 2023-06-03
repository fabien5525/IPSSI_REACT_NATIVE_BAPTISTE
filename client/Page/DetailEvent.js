import { StyleSheet, Text, View, Image,Modal,Button,TextInput,FlatList } from 'react-native';

export default function DetailEvent({navigation, route }) {
    const event = route.params;
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
                {event.description}
            </Text>
            <Text>
            {event.niveau}
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