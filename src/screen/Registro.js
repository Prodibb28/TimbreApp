import React, { useState, useEffect} from 'react';
import { StyleSheet, View,TouchableOpacity, Text, ScrollView} from 'react-native';
import { firebase } from '../config/config';
import { Table, Row, Rows } from 'react-native-table-component';

const Registro = () => {

  const [DataAlarmsAct, setDataAlarmsAct]= useState('');
  const [showTable, setshowTable]= useState(false);

  useEffect(() => {
    AlarmsProg();
  }, []);
  const showT = (enabled) => {
    setshowTable(enabled);
  }

  const AlarmsProg = async () => {
    const alarmsRef = firebase.database().ref('/T02/AlarmsActived');
    const tAlarmsRef = firebase.database().ref('/T02/Talarms');
  
    const alarmsSnapshot = await alarmsRef.once('value');
    const tAlarmsSnapshot = await tAlarmsRef.once('value');
  
    const currentAlarms = alarmsSnapshot.val() || {};
    const currentTAlarms = tAlarmsSnapshot.val() || {};
      if(currentAlarms){
        const alarms = Object.entries(currentAlarms).map(([key, value]) => {
          let tempDate = new Date(value)
          let hora = tempDate.getHours()+':' + tempDate.getMinutes();
          let date = tempDate.getDay()+'/' + tempDate.getMonth()+'/' + tempDate.getFullYear();
          const tAlarmValue = currentTAlarms[key] || '';
  
          // Verificar y asignar el valor deseado
          let tAlarm = '';
          if (tAlarmValue === '1') {
            tAlarm = 'Descanso';
          } else if (tAlarmValue === '2') {
            tAlarm = 'Cambio';
          } else if (tAlarmValue === '3') {
            tAlarm = 'Salida';
          }
          return {
            key,
            hora,
            date,
            tAlarm,
          }
        })
        setDataAlarmsAct(alarms)
        console.log(alarms)
        showT(true);
      }
      else{
        showT(false);
      }
    }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.TitleSect}>Timbres Activados</Text> 
      <ScrollView style={styles.tableCont}> 
      {showTable &&(<Table  style={{marginVertical:20}} borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff'}}>
          <Row data={['Hora','Fecha' ,'T. Timbre']}  textStyle={styles.text} />
          <Rows data={DataAlarmsAct.map(alarm => [alarm.hora, alarm.date,alarm.tAlarm ]) }  textStyle={styles.text}/>
        </Table>)}
        </ScrollView>
        <TouchableOpacity
              style={styles.btnAct}
              onPress={() => AlarmsProg()}
            >
              <Text style={{ color: 'white', padding:10,alignSelf:'center', fontWeight:'900'}}>ACTUALIZAR REGISTRO</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'white',
 
  },
  btnAct:{
    marginBottom:80,
    backgroundColor:'#1976D2',
    marginHorizontal:20,
    borderRadius:10,

  },
  tableCont:{
    marginTop:20,
    marginBottom:20,
    marginHorizontal:20,
    borderWidth:1,
    borderRadius:10,
    padding:20,
    borderColor:'#D9D9D9'
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  TitleSect:{
    fontSize:20,
    fontWeight:'300',
    alignSelf:'center',
  },
  text:{
    alignSelf:'center',
    fontSize:17,
    fontWeight:600,
    padding:5,
    margin: 5,
  },
});

export default Registro;
