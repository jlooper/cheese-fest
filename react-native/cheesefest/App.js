import React, { Component } from 'react';
import { AppRegistry, ListView, TouchableHighlight, Image, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
const firebase = require('firebase');
const ListItem = require('./components/ListItem');
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
    <ListItem item={item}>
    <TouchableHighlight onPress={() => navigate('DetailScreen', { user: 'll' })}>
        <View style={styles.liContainer}>
            <Image style={{ height:100, width: 100 }}
            source={{uri: item.Image}}
            />
            <View style={styles.liTextContainer}>
                <Text style={styles.liText}>{item.Name}</Text>
            </View>
        </View>
      </TouchableHighlight>
    </ListItem>
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
    const { navigate } = this.props.navigation;
    return (
      <View>
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
    title: `Chat with ${navigation.state.params.user}`,
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
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