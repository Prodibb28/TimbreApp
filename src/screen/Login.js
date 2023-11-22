import React, { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, Keyboard } from "react-native"
import { firebase } from '../config/config'
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input.js"
import Button from "../components/Button.js";
import Loader from "../components/Loader.js";


function Login(){
    const navigation = useNavigation();
    const[inputs, setInputs] = useState({
        email:'',
        password: '',
    });
    const[errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const validate = () => {
        Keyboard.dismiss();
        console.log(inputs)
        let isValid = true;
        if(!inputs.email){
            handleError('Por favor ingresa un correo electrónico', 'email')
            isValid = false;
        }
        else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('por favor ingresa un correo electrónico válido', 'email');
            isValid = false;
        }
        if (!inputs.password) {
            handleError('Por favor ingresa una contraseña', 'password');
            isValid = false;
        } else if (inputs.password.length < 5) {
            handleError('El tamaño minimo debe ser de 5 caracteres', 'password');
            isValid = false;
        }
        if (isValid) {
            loginUser(inputs.email,inputs.password);
        }
    };
    const loginUser = async (email, password) => {
        setLoading(true);
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
          alert(error.message);
        }
        setLoading(false);
      };
    
    const handleOnChange = (text, input) => {
        setInputs(prevState =>({...prevState, [input]: text}));
    };
    const handleError = (errorMessage, input)=>{
        setErrors(prevState => ({...prevState, [input]: errorMessage}));
    }
    

    return(
        <SafeAreaView style = {styles.mainContainer}>
            <Loader visible={loading}/>
            <View style = {styles.contentContainer}>
                <Text style = {styles.textTitle}>
                    Bienvenidos a Timbre
                </Text>
                <View style = {styles.inputsContainer}>
                    <Input 
                        onChangeText={text => handleOnChange(text, 'email')}
                        placeholder="correo@gmail.com" 
                        iconName="mail" 
                        error={errors.email}
                        onFocus={() => {
                            handleError(null, 'email')
                        }}
                        label="Correo electrónico"/>
                    <Input 
                        onChangeText={text => handleOnChange(text, 'password')}
                        placeholder="Contraseña"
                        iconName="lock-closed-outline" 
                        error={errors.password}
                        onFocus={() => {
                            handleError(null, 'password')
                        }}
                        label="Contraseña"
                        password
                    />
                    
                </View>
                <Text style = {styles.textPassword}>¿Olvidaste la contraseña?</Text>
                <Button title='INICIAR SESIÓN'colorButton="#64B5F6" onPress={validate}/>
                <Button 
                onPress={() => navigation.navigate('SingUp')}
                title='CREAR CUENTA' colorButton="#1976D2"/>
            </View>
        </SafeAreaView>
    )
} 

export default Login;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    contentContainer: {
        paddingTop:70,
        paddingHorizontal:20,
        
    },
    textTitle: {
        fontSize:35,
        color:'#454545',
        width:250,
        fontWeight: 'bold'
    },
    inputsContainer: {
        marginTop:50,
        height:200,
        justifyContent:'space-around'
    },
    textPassword: {
        alignSelf:'center',
        marginVertical:5,
        fontWeight:'bold',
        fontSize:15,
        color:'#454545',

    },
    textCreateAccount: {
        alignSelf:'center',
        fontWeight:'bold',
        color:'#454545',
  
    }
})