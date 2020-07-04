
import React,{useState} from 'react';
import {
  Text,StyleSheet,View,FlatList
} from 'react-native';

const App = () => {
  // Definir el State de Citas
  const [citas, setCitas] = useState([
    {id: "1", paciente:"Hook",propietario:"Juan",sintomas:"No Come"},
    {id: "2", paciente:"Redux",propietario:"Itzel",sintomas:"No Duerme"},
    {id: "3", paciente:"Native",propietario:"Josue",sintomas:"No Canta"}
  ]
  );
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de Citas</Text>
      <FlatList
        data={citas}
        renderItem={ ({item}) =>(
          <View>
            <Text>{item.paciente}</Text>
          </View>
        )
        }
        keyExtractor={cita => cita.id}
      />
      
      
      {/*citas.map(cita => (
        <View>
          <Text>{cita.paciente}</Text>
        </View>

      ))*/}
      
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor:{
    backgroundColor: '#AA076B',
    flex: 1
  },
  
  titulo: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default App;
