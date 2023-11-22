import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

const Button = ({title,colorButton, onPress = () => {}}) => {
    return <TouchableOpacity 
    activeOpacity={0.7}
    onPress={onPress}
    style = {[style.ButtonStyle, 
            {backgroundColor: colorButton}]}
    >
        <Text style ={style.ButtonText} >{title}</Text>
    </TouchableOpacity>
};

const style = StyleSheet.create({
    ButtonStyle: {
        height:50,
        width: '100%',
        borderRadius:15,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:15
    },
    ButtonText: {
        color: "white",
        fontWeight:'bold',
        fontSize:14
    },
})
export default Button;