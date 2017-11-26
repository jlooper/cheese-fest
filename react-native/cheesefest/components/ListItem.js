import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, Image, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight>
        <View style={styles.liContainer}>
            <Image style={{ height:100, width: 100 }}
            source={{uri: this.props.item.Image}}
            />
            <View style={styles.liTextContainer}>
                <Text style={styles.liText}>{this.props.item.Name}</Text>
            </View>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;