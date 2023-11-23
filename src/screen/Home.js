
import React from "react";
import { View, Text, StyleSheet} from "react-native"
import { useNavigation } from "@react-navigation/native";

const Home= () => {
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });