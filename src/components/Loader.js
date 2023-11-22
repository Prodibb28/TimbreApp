import React from 'react'
import { View, StyleSheet, Text, useWindowDimensions, ActivityIndicator} from "react-native";

const Loader = ({visible = false}) => {
    const {height, width} = useWindowDimensions();
    return (
        visible &&( 
        <View style={[style.container,{height, width}]}>
            <View style={style.loader}>
                <ActivityIndicator size="large" color="#1976D2 "></ActivityIndicator>
                <Text style={{marginLeft:10, fontSize:16}}>Procesando...</Text>
            </View>
        </View>
        )
    )
}

const style = StyleSheet.create({
    container:{
        position: "absolute",
        zIndex:10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center'
    },
    loader:{
        height:70,
        backgroundColor:"white",
        marginHorizontal:40,
        borderRadius:10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:20,
    },
    textLoad:{
        paddingHorizontal:20
    }
})
export default Loader;