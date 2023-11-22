import React, { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Keyboard } from "react-native"
import { firebase } from '../config/config'

import Input from "../components/Input.js"
import Button from "../components/Button.js";
import Loader from "../components/Loader.js";



const SingUp = () => {
    const[inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email:'',
        password: '',
        DNI:'',
    });
    const[errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;
        if(!inputs.email){
            handleError('Por favor ingresa un correo electrónico', 'email')
            isValid = false;
        }
         else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
        handleError('por favor ingresa un correo electrónico válido', 'email');
        isValid = false;
      }

      if (!inputs.firstName) {
        handleError('Por favor ingresa un nombre', 'firstName');
        isValid = false;
      }
      if (!inputs.lastName) {
        handleError('Por favor ingresa un apellido', 'lastName');
        isValid = false;
      }

      if (!inputs.phone) {
        handleError('Por favor ingresa un celular', 'phone');
        isValid = false;
      }
      if (!inputs.DNI) {
        handleError('Por favor ingresa un DNI', 'DNI');
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
        registerUser(inputs.email, inputs.password, inputs.firstName,
            inputs.lastName, inputs.phone, inputs.DNI);
      }

    };
    registerUser = async(email, password, FirstName, LastName,Phone, DNI) => {
        setLoading(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()  => {
             firebase.auth().currentUser.sendEmailVerification({
                 handleCodeInApp: true,
                 url:'https://ona-app-97cec.firebaseapp.com'
              })
             .then (() => {        
                 alert('verification email sent')
             }).catch((error) => {
                 alert(error.message)
             })
             .then(() => {
                 firebase.firestore().collection('users')
                 .doc(firebase.auth().currentUser.uid)
                 .set({
                     FirstName,
                     LastName,
                     email,
                     Phone,
                     DNI                  
                 })
             })
             .catch((error) => {
                 alert(error.message)
             })
         })
         .catch((error=> {
             alert(error.message)
         }))
         setLoading(false);
     }
    const handleOnChange = (text, input) => {
        setInputs(prevState =>({...prevState, [input]: text}));
    };
    const handleError = (errorMessage, input)=>{
        setErrors(prevState => ({...prevState, [input]: errorMessage}));
    }

    
    return(
        <SafeAreaView style = {styles.mainContainer}>
            <Loader visible={loading}/>
            <Text style = {styles.textTitle}>
                    Registrarse
            </Text>
            <ScrollView style = {styles.contentContainer}>
                <View style = {styles.inputsContainer}>
                    <Input 
                        onChangeText={text => handleOnChange(text, 'firstName')}
                        placeholder="Primer Nombre" 
                        iconName="person" 
                        error={errors.firstName}
                        onFocus={() => {
                            handleError(null, 'firstName')
                        }}
                        label="Nombre"/>
                    <Input 
                        onChangeText={text => handleOnChange(text, 'lastName')}
                        placeholder="Primer Apellido" 
                        iconName="person" 
                        error={errors.lastName}
                        onFocus={() => {
                            handleError(null, 'lastName')
                        }}
                        label="Apellido"/>
                    <Input 
                        onChangeText={text => handleOnChange(text, 'phone')}
                        placeholder="Numero de telefono" 
                        iconName="call" 
                        keyboardType="numeric"
                        error={errors.phone}
                        onFocus={() => {
                            handleError(null, 'phone')
                        }}
                        label="Celular"/> 
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
                        onChangeText={text => handleOnChange(text, 'DNI')}
                        placeholder="123456" 
                        iconName="card" 
                        error={errors.DNI}
                        onFocus={() => {
                            handleError(null, 'DNI')
                        }}
                        label="Documento de identidad"/>
                       
                    <Input 
                        onChangeText={text => handleOnChange(text, 'password')}
                        placeholder="Contraseña"
                        iconName="lock-closed" 
                        error={errors.password}
                        onFocus={() => {
                            handleError(null, 'password')
                        }}
                        label="Contraseña"
                        password
                    />
                    
                    <Button title='CREAR CUENTA' colorButton="#1976D2" onPress={validate}/>
                    <Button 
                        onPress={() => navigation.navigate('Login')}
                        title='INICIAR SESIÓN'colorButton="#64B5F6"/>
                </View>
            </ ScrollView>
        </SafeAreaView>
    )
} 

export default SingUp;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal:20
    },
    textTitle: {
        fontSize:35,
        color:'#454545',
        width:300,
        fontWeight: 'bold',
        paddingTop:70,
        paddingBottom:20,
        paddingHorizontal:20
    },
    inputsContainer: {
    },
    textPassword: {
        alignSelf:'center',
        fontWeight:'bold',
        color:'#454545',

    },
    textSignUp: {
        alignSelf:'center',
        fontSize:16,
        fontWeight:'bold',
        color:'#454545',
        paddingBottom:20,
    }
})