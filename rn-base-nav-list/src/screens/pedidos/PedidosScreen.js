import React from 'react';
import { SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import * as firebase from 'firebase';

import Constants from 'expo-constants';

function Item({ id, title, preco, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#76D056' : '#F5F5F5' },
      ]}
    >
      <Image style={{width: 50, height: 50}}
       source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
  />
      <Text style={styles.title}>{title} R${preco}</Text>
    </TouchableOpacity>
  );
}

function PedidosScreen({ navigation }) {
  const [selected, setSelected] = React.useState(new Map());
  var itensPedido = [];

  const onSelect = React.useCallback(id => {
    const newSelected = new Map(selected);
     newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
    },
    [selected],
  );
  const alias = navigation.state.params
  console.log("TCL: ListScreen -> alimesaas", alias)

  const DATA = [];

  return (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item 
            id={item.id}
            title={item.title}
            preco={item.preco}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
      <TouchableHighlight onPress={() => enviaPedido()} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Conﬁrmar pedido</Text>
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
    backgroundColor: '#F5F5F5',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    textAlign: 'right',
  },
});

export default PedidosScreen;
