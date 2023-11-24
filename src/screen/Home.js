import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Button, Text, Switch, Alert,Platform,TouchableOpacity,ScrollView  } from 'react-native';
import { firebase } from '../config/config';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';

const Home = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timeStamp, setTimeStamp] = useState();
  const [show, setShow]= useState(false);
  const [showTable, setshowTable]= useState(false);
  const [text, setText]= useState('Seleccionar Hora');

  const [DataAlarmsPro, setDataAlarmsPro]= useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Descanso', value: '1'},
    {label: 'Cambio de clase', value: '2'},
    {label: 'Salida', value: '3'}
  ]);
  useEffect(() => {
    AlarmsProg();
  }, []);

  const onChange = (event, selectedDate)=>{
    const currentDate = selectedDate || date;
    setShow(Platform.OS ==='ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let ftime = 'Hora ' + tempDate.getHours() + ' - Minutos: ' + tempDate.getMinutes();
    const timStamp = tempDate.getTime();
    setTimeStamp(timStamp);
    setText(ftime);
  }
  const showTimePicker = () => {
    setShow(true);
  }
  const showT = (enabled) => {
    setshowTable(enabled);
  }

  const toggleTimbre = () => {
    setIsEnabled(!isEnabled);
    firebase.database()
    .ref('/T02/')
    .set({
        State:!isEnabled
    })
  };

  const AlarmsProg = async () => {
  const alarmsRef = firebase.database().ref('/T02/Alarms/');
  const tAlarmsRef = firebase.database().ref('/T02/Talarms');

  const alarmsSnapshot = await alarmsRef.once('value');
  const tAlarmsSnapshot = await tAlarmsRef.once('value');

  const currentAlarms = alarmsSnapshot.val() || {};
  const currentTAlarms = tAlarmsSnapshot.val() || {};
    if(currentAlarms){
      const alarms = Object.entries(currentAlarms).map(([key, value]) => {
        let tempDate = new Date(value)
        let hora = tempDate.getHours()+':' + tempDate.getMinutes();
        console.log(currentTAlarms)
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
          tAlarm,
        }
      })
      setDataAlarmsPro(alarms)
      console.log(alarms)
      showT(true);
    }
    else{
      showT(false);
    }
  }

  const saveTimbre = async () =>{
    const selectedAlarm = value;
    
    const alarmsRef = firebase.database().ref('/T02/Alarms/');
    const tAlarmsRef = firebase.database().ref('/T02/Talarms');
    const alarmsSnapshot = await alarmsRef.once('value');
    const currentAlarms = alarmsSnapshot.val() || {};

 
    const alarmsValues = Object.values(currentAlarms);

    
    const hasDuplicateTime = alarmsValues.some(alarm => {
      const alarmDate = new Date(alarm);
      const selectedDate = new Date(timeStamp);
   
      return (
        alarmDate.getHours() === selectedDate.getHours() &&
        alarmDate.getMinutes() === selectedDate.getMinutes()
      );
    });
    if (!hasDuplicateTime && timeStamp !== '' && selectedAlarm!== '') {
      const selectedDate = new Date(timeStamp);
      console.log(value)
      if (!isNaN(selectedDate.getHours()) && value!== null) {
        // Crear un nuevo nombre para la alarma
        const newAlarmName = `alarm_${selectedDate.getHours()}_${selectedDate.getMinutes()}`;
        await alarmsRef.child(newAlarmName).set(timeStamp);
        await tAlarmsRef.child(newAlarmName).set(selectedAlarm);
      }
      else{Alert.alert('Error', 'Selecciona una hora y el tipo de alarma');}

    }
    else{
      Alert.alert('Error', 'Verifica la hora y el tipo de alarma');
    }
    AlarmsProg();
  };

  const handleButtonPress = (key) => {
    Alert.alert(
      'Confirmar Borrado',
      '¿Estás seguro de que quieres borrar este timbre programado?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Borrar',
          onPress: async () => {
            try {
              // Referencia al campo que deseas borrar
              const alarmRef = firebase.database().ref(`/T02/Alarms/${key}`);
              const tAlarmRef = firebase.database().ref(`/T02/Talarms/${key}`);

              // Borrar el campo de la base de datos
              await alarmRef.remove();
              await tAlarmRef.remove();

              // Actualizar la lista de timbres programados
              AlarmsProg();
            } catch (error) {
              console.error('Error al borrar el timbre programado', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View  style={styles.switchCont} >
        <Text style={styles.TitleSect}>Activar timbre</Text>
        <Switch
          value={isEnabled}
          onValueChange={toggleTimbre}
        />
      </View>
      <View style={styles.progCont}>
        <Text style={styles.TitleSect}>Programar Timbre</Text>

        <Text style={styles.TimeText}>{text}</Text>
        
        <Button  title='Seleccionar hora' onPress={() => showTimePicker()}></Button>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          required
          placeholder="Tipo de alarma"
          theme="LIGHT"
          setValue={setValue}
          setItems={setItems}
          style={{
            borderColor:'#D9D9D9',
            marginVertical:20
          }}
          dropDownContainerStyle={{
            borderColor:'#D9D9D9',
            marginVertical:20
          }}
      />
      <Button title='Guardar timbre' onPress={() => saveTimbre()}></Button>

        {show &&(<DateTimePicker
        testID='dateTimePicker'
        value={date}
        mode= {'time'}
        is24Hour={true}
        display='default'
        onChange={onChange}
        />)}
      </View>
     
        <ScrollView style={styles.tableCont}>
        <Text style={styles.TitleSect}>Timbres Programados</Text>  
          {showTable &&(<Table  style={{marginTop:20, marginBottom:50}} borderStyle={{  borderWidth: 1, borderColor: '#c8e1ff'}}>
            <Row data={['Hora','T. Timbre' ,'Acción']}  textStyle={styles.text} />
            <Rows data={DataAlarmsPro.map(alarm => [alarm.hora,alarm.tAlarm, 
            <TouchableOpacity
              style={{
                backgroundColor: 'red', 
                padding:5,
                margin: 5,
                borderRadius: 5,
              }}
              onPress={() => handleButtonPress(alarm.key)}
            >
              <Text style={{ color: 'white', alignSelf:'center', fontWeight:'900'}}>BORRAR</Text>
          </TouchableOpacity>
        ]) }  textStyle={styles.text}/>
          </Table>)}

        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'white',
  },
  TitleSect:{
    fontSize:20,
    fontWeight:'300',
    alignSelf:'center',
  },
  switchCont:{
    marginVertical:5,
    marginHorizontal:20,
    justifyContent:'space-around',
    flexDirection:'row',
    alignItems:'center',
    borderWidth:1,
    borderRadius:10,
    padding:10,
    borderColor:'#D9D9D9'
  },
  
  progCont:{
    marginVertical:5,
    marginHorizontal:20,
    alignItems:'stretch',
    borderWidth:1,
    borderRadius:10,
    padding:20,
    borderColor:'#D9D9D9'
  },

  tableCont:{
    marginTop:20,
    marginBottom:80,
    marginHorizontal:20,
    borderWidth:1,
    borderRadius:10,
    padding:20,
    borderColor:'#D9D9D9'
  },
  DeleteBttn:{
    backgroundColor:'White',
  },
  text:{
    alignSelf:'center',
    fontSize:17,
    fontWeight:600,
  },
  TimeText:{
    fontSize: 15,
    fontWeight: 'bold',
    margin: 16,
    alignSelf:'center'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderColor: "#9eb4c1",
    borderWidth: 0.8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Home;
