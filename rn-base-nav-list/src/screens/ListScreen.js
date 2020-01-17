import React from 'react';
import { SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import * as firebase from 'firebase';

import Constants from 'expo-constants';

function Item({ id, url, title, preco, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#76D056' : '#F5F5F5' },
      ]}
    >
      <Image style={{width: 70, height: 70}}
       source={{uri: url}}
     />
      <Text style={styles.title}>{title} R${preco}</Text>
    </TouchableOpacity>
  );
}

function ListScreen({ navigation }) {
  const [selected, setSelected] = React.useState(new Map());
  var itensPedido = [];

  const onSelect = React.useCallback(id => {
    const newSelected = new Map(selected);
     newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
    },
    [selected],
    );

  const alias = navigation.state.params.dados
  console.log("TCL: ListScreen -> alias", alias)

  // const nomeRest = alias.Nome;
  const mesaRest = navigation.state.params.dados.mesa;
  const caminhoRest = navigation.state.params.dados.restaurante;
  const lista = alias.dados.cardapio.lista;
  const DATA = lista;

  lista.forEach(element => {
    if (!!selected.get(element.id)) {
      itensPedido.push(element.id)
    }
  });

  async function enviaPedido() {
    const listEnv = [];
    await itensPedido.forEach(element => {
      listEnv.push({ mesa: mesaRest, estado: 'pendente', id: element });
    });

    await firebase.database().ref('restaurantes/'+caminhoRest+'/pedidos').set({
      listEnv: listEnv
    });

    firebase.database().ref('restaurantes/' + caminhoRest).once('value', (restaurante) => {
      // Faltou colocar o filtro por mesa.
      const dados = restaurante.val();
      navigation.navigate('Pedidos', {dados});
    });
    
  }

  return (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item 
            id={item.id}
            title={item.title}
            preco={item.preco}
            url={item.url}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
      <TouchableHighlight onPress={() => enviaPedido()} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Adicionar itens</Text>
          </View>
        </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    height: 90,
  },

  button: {
    flex: 1,
    margin:20,
    top:20,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 30,
    fontSize: 20,
    marginVertical: 5,
    marginHorizontal: 5,

  },

  buttonText: {
    padding: 8,
    margin:20,
    top:20,
    backgroundColor: '#76D056',
    color:'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 10,
    borderWidth: 1,

  },

  item: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  title: {
    padding: 10,
    fontSize: 18,
    textAlign: 'right',
  },
});

export default ListScreen;
