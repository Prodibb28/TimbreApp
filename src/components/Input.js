import React, { useState } from "react";
import { View, Text,StyleSheet, TextInput} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const Input = ({
    label,
    iconName,
    error,
    password,
    onFocus = () => {},
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);
    return (
        <View style = {{marginBottom: 10}}>
            <Text style ={style.label}>{label}</Text>
            <View style ={[style.inputContainer,
                {
                    borderColor: error 
                        ? "red"
                        : isFocused 
                        ? "#1976D2"
                        :"#8A8989"
                        },
                ]}>
                <Icon name = {iconName} style={style.icon}/>
                <TextInput 
                    secureTextEntry={hidePassword}
                    autoCorrect = {false}
                    onFocus={() =>{
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    style={style.inpText}
                    {...props}
                />
                {password && (
                     <Icon 
                        onPress={() => setHidePassword(!hidePassword)}
                        name= {hidePassword ? "eye-outline" : "eye-off-outline"} 
                        style={style.iconShowPass}
                     />
                )}
               
            </View>
            {error && (
                <Text style = {style.labelError}>
                    {error}
                </Text>
            )}
        </View>
        );
};

export default Input;

const style = StyleSheet.create({
    label: {
        marginVertical:4,
        marginHorizontal:10,
        color: "#8A8989",
        fontSize: 14,
    },
    labelError:{
        color: "red", 
        fontSize:12,
        marginHorizontal:10,
    },
    inputContainer:{
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderColor:"#8A8989",
        borderWidth: 0.8,
        borderRadius:15,
        alignItems: 'center',
    },
    inpText: {
        flex:1,
        color:"#8A8989",
        fontSize: 14
    },
    icon:{
        marginRight:10,
        fontSize: 18,
        color:"#1976D2"
    },
    iconShowPass:{
        marginRight:10,
        fontSize: 22,
        color:"#1976D2"
    }
})