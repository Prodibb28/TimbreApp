import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


const Registro = () => {
  return (
    <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to Registro</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems:'center',
    backgroundColor:'white',
    borderBottomColor:'black',
    borderColor:"#9eb4c1",
    borderWidth: 0.8,
  },
  cardsContainer:{

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Registro;
