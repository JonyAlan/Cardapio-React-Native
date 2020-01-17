import React from 'react';
import { Text, StyleSheet, TouchableHighlight, View, SafeAreaView } from 'react-native';

const HomeScreen = ({ navigation }) => {

  const dados = navigation.state.params
  const nome = navigation.state.params.dados.Nome
  const mesa = navigation.state.params.mesa
  console.log("TCL: HomeScreen -> alias", dados)

  function cardapio() {
    navigation.navigate('Lista', {dados});
  }
  function pedidos() {

  }
  function conta() {

  }

  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Restaurante: {nome}</Text>
      <Text style={styles.title}>Mesa: {mesa}</Text>
      <TouchableHighlight style={styles.button} onPress={() => cardapio()} underlayColor="white">
          <View>
            <Text style={styles.buttonText}>Cardapio</Text>
          </View>
        </TouchableHighlight>
      <TouchableHighlight style={styles.button} onPress={() => pedidos()} underlayColor="white">
          <View >
            <Text style={styles.buttonText}>Meus Pedidos</Text>
          </View>
        </TouchableHighlight>
      <TouchableHighlight style={styles.button} onPress={() => conta()} underlayColor="white">
          <View >
            <Text style={styles.buttonText}>Pedir a conta</Text>
          </View>
        </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: 30,
    height: 90,
  },

  button: {
    padding: 20,
    margin:15,
    top:60,
    backgroundColor: '#E5EAF0',
    borderRadius: 4,
    borderWidth: 0.5,

  },

  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  item: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
