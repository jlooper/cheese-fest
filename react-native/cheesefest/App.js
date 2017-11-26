import React, { Component } from 'react';
import { AppRegistry, ListView, View } from 'react-native';
const firebase = require('firebase');
const StatusBar = require('./components/StatusBar');
const ListItem = require('./components/ListItem');
const DetailView = require('./components/DetailView');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBmCm0beuV5YVKMNwrT2vHs9s9nGL2mr84",
  databaseURL: "https://cheeses-4fe5f.firebaseio.com"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const styles = require('./styles.js')

export default class cheesefest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('Cheeses');
 }

 getRef() {
  return firebaseApp.database().ref();
}

listenForItems(itemsRef) {
  itemsRef.on('value', (snap) => {

    // get children as an array
    var items = [];
    snap.forEach((child) => {
      items.push({
        Name: child.val().Name,
        Image: child.val().Image,
        _key: child.key
      });
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items)
    });

  });
}

_renderItem(item) {
  return (
    <ListItem item={item} onPress={() => navigate('DetailView', {data: item})} />
  );
}

componentDidMount() {
  this.listenForItems(this.itemsRef);
}

  render() {
    return (
      <View>
      <StatusBar title="Cheeses" />
      <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
      </View>
    );
  }
}