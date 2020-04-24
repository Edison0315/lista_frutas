import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, FlatList } from 'react-native';
import { Card, Button } from 'react-native-elements'

export default function App() {

  const [valueList, setValueList] = useState();

  const getDataFrutas = () => {
    // Alert.alert("Me presionaron...");

    fetch("http://localhost:3000/product/list")
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.productDB);
      setValueList(responseJson.productDB);
    })
    .catch((error) => {
      console.log(error.message);
    });

  }

  return (
    <View style={styles.container}>
      <Button title="Consultar" onPress={ getDataFrutas } />
      <FlatList
        data={valueList}
        renderItem={({ item }) => (
          <Card title={ item.description }>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{ uri: `http://192.168.1.59:3000/${item.img}` }}
            />
            <Text style={styles.text} >
              <Text style={styles.textInside} >Descripcion: </Text> 
              { item.description }
            </Text>
            <Text style={styles.text} >
              <Text style={styles.textInside} >Precio: </Text>
                $ { item.price }
              </Text>
            <Text style={styles.text} >
              <Text style={styles.textInside} >Cantidad: </Text> 
              { item.amount }
            </Text>
          </Card>
        )}
        keyExtractor={item => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 20,
    padding: 100,
  },
  text: {
    marginTop: 10,
    fontSize: 14,
  },
  textInside:{
    fontWeight: 'bold'
  }, 
  image: {
    width: 100,
    height: 100,
  }
});
