import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { config, settings } from "./FirebaseConfig";

firebase.initializeApp(config);

const firestore = firebase.firestore();
firestore.settings(settings);

var data = []

console.disableYellowBox = ['Remote Debugger'];

export default class App extends Component {

  


  componentDidMount(){

    this._getRealTimeData();
   


  }

  render() {
    return (

     
      <View style={styles.container}>
        <Text>Firestore</Text>

        <FlatList
          data={this.data}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
    );
  }
  

  _getRealTimeData = () => {
       
    firestore.collection("fl_content")
  .onSnapshot(function(querySnapshot) {

 
      querySnapshot.forEach(function(doc) {
          
        data.push(doc.data().nombre);

      });
      console.log("Current cities in CA: ", data.join(", "));
  });

 

  };


    

}//class

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})