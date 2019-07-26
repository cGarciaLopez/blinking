import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Text, View } from 'react-native';
import { TaskManager } from 'expo';

class Blink extends Component {

  componentDidMount(){
    // datos de compra de paquete de 50 €
    var cambioCompra = "9251"
    var cantidadCompra ="50";
    var totalBTCs = cantidadCompra / cambioCompra;
    var profit = false;
    var profitStyle = "perdidas";

    // Toggle the state every second
    setInterval(() => (
    fetch('https://blockchain.info/ticker')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('got it:'+ responseJson.EUR.last);
        if( responseJson.EUR.sell > cambioCompra){
          profit = true;
          profitStyle = "ganancias"
        }
        this.setState({
          isLoading: false,
          eurLast: responseJson.EUR.last,
          eurBuy: responseJson.EUR.buy,
          eurSell: responseJson.EUR.sell,
          misBtcs: totalBTCs,
          balance: profitStyle,
          cantidad: (totalBTCs * responseJson.EUR.sell) - totalBTCs,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      }),

    // setea el estado
    this.setState(previousState => (
        { isShowingText: !previousState.isShowingText }
     ))
   ), 10000);
  }

  //state object
  state = { isShowingText: true,
            eurLast : null,
            eurBuy: null,
            eurSell: null,
            eurProfit: null,
            misBtcs: null,
            balance: null,
            cantidad: null
          };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>1 BTC  €{this.state.eurLast}</Text>
         <Image style={styles.logo} source={require('./assets/btc-icon.jpeg')} />
        <Text style={styles.regularParagraph}>Precio de compra €{this.state.eurBuy}</Text>
        <Text style={styles.regularParagraph}>Precio de venta €{this.state.eurSell}</Text>
        <Text>---------------------------------------</Text>
        <Text style={styles.regularParagraph}>50€ comprados a  9251 €{this.state.eurProfit}</Text>
        <Text style={styles.smallParagraph}>( BTC {this.state.misBtcs } )</Text>
        <Text style={ (this.profit) ? styles.ganancias : styles.perdidas }>{this.state.cantidad}</Text>
      </View>
    );
  }
}

export default class BlinkApp extends Component {
  render() {
    return (
      <View>
        <Blink text='I love to blink' />
        <Text style={styles.smallParagraph}>
          Precios en tiempo real, actualizados cada 10 segundos
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  regularParagraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ganancias: {
    color: "green",
    fontWeight: 'bold'
  },
  perdidas: {
    color: "red",
    fontWeight: 'bold'
  },
  smallParagraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  }
});


// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => BlinkApp);
