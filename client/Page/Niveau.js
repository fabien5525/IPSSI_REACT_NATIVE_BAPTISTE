import { StyleSheet, Text, View , Button, Pressable, FlatList, Image } from 'react-native';

export default function Niveau({ navigation, route }) {
    const niveau = route.params;
    return (
        <View>
      <Text>
        {niveau.name}
      </Text>
     </View>
    )
}