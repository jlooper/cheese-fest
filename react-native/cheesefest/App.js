import React, { Component } from 'react';
import { AppRegistry, ListView, TouchableHighlight, Button, Image, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
const firebase = require('firebase');
const firebaseConfig = {
  apiKey: "AIzaSyBmCm0beuV5YVKMNwrT2vHs9s9nGL2mr84",
  databaseURL: "https://cheeses-4fe5f.firebaseio.com"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const styles = require('./styles.js')

class ListScreen extends React.Component {
  
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
        Description: child.val().Description,
        _key: child.key
      });
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items)
    });

  });
}

_renderItem(item) {
  const { navigate } = this.props.navigation;
  
  return (
    <TouchableHighlight onPress={() => navigate('DetailScreen', { Name:item.Name, Description:item.Description, Image:item.Image })}>
        <View style={styles.liContainer}>
        <Image style={{ height:100, width: 100 }}
            source={{uri: item.Image}}
            />
            <View style={styles.liTextContainer}>
                <Text style={styles.liText}>{item.Name}</Text>
            </View>
        </View>
      </TouchableHighlight>
  );
}

componentDidMount() {
  this.listenForItems(this.itemsRef);
}

  static navigationOptions = {
    title: 'Cheeses',
    headerStyle: styles.navbar
  };
  
  render() {
    
    return (
      <View style={styles.container}>
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this._renderItem.bind(this)}
      enableEmptySections={true}
      style={styles.listview}/>
    </View>
    );
  }
}

class DetailScreen extends React.Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.Name}`,
    headerStyle: styles.navbar,
    headerTintColor: 'black',
  });

  
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
      <Image style={{ height:200, width: 400 }}
      source={{uri: this.props.navigation.state.params.Image}}
      />
        <Text style={styles.detailText}>{this.props.navigation.state.params.Description}</Text>
      </View>
    );
  }

  
}

export const CheeseFest = StackNavigator({
  ListScreen: { screen: ListScreen },
  DetailScreen: { screen: DetailScreen },
});

export default class App extends React.Component {
  render() {
    return <CheeseFest />;
  }
}