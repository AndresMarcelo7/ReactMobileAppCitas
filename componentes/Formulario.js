import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({citas,setCitas,guardarMostrarForm}) => {
  const [fecha, guardarFecha] = useState('');
  const [hora, guardarHora] = useState('');

  const [paciente, guardarPaciente] = useState('');
  const [propietario, guardarPropietario] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [sintomas, guardarSintomas] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = date => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    guardarFecha(date.toLocaleDateString('es-CO', opciones));
    hideDatePicker();
  };

  // Muestra u oculta el time picker

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = date => {
    const opciones = {hour: '2-digit', minute: '2-digit'};
    guardarHora(date.toLocaleTimeString('es-CO', opciones));
    hideTimePicker();
  };

  // Crear nueva cita
  const crearNuevaCita = () => {
      console.log("Desde crear nueva cita ");
        // Validar espacios
        if (propietario.trim() === '' || paciente.trim() === '' || telefono.trim() === '' || hora.trim() === '' || fecha.trim() === ''
        || sintomas.trim() === ''){
            mostrarAlerta();

        }

        const cita = {propietario,paciente,telefono,hora,fecha,sintomas}
        cita.id = shortid.generate();

        //Agregar cita al state

        const citasNuevo = [...citas,cita]; //Aqui adiciona cita a la lista de citas que manda via props
        setCitas(citasNuevo);

        //Ocultar el formulario
        guardarMostrarForm(false);

        //Resetear el formulario

  }

  const mostrarAlerta = () =>{
      Alert.alert(
          'Error', //titulo
          'Todos los campos son obligatorios', //Mensaje
          [{
              text: 'OK' //Arrego de botones
          }]
      );
  }

  

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarPaciente(texto)}
          />
        </View>

        <View>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarPropietario(texto)}
          />
        </View>

        <View>
          <Text style={styles.label}> Telefono Contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarTelefono(texto)}
            keyboardType={'phone-pad'}
          />
        </View>
        <View>
          <Text style={styles.label}> Seleccione una Fecha</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige La fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{fecha}</Text>
        </View>

        <View>
          <Text style={styles.label}> Seleccione una Hora</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
            headerTextIOS="Elige una hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
            is24Hour
          />
          <Text>{hora}</Text>
        </View>

        <View>
          <Text style={styles.label}> Síntomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={texto => guardarSintomas(texto)}
          />
        </View>

        <View>
          <TouchableHighlight
            onPress={() => crearNuevaCita()}
            style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}> Submit &times;</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Formulario;
