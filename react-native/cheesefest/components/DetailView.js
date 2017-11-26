import React, { Component } from 'react';
import { Text } from 'react-native';

class DetailView extends Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
        <View>
            <Text>bonjour</Text>
        </View>
     
    );
  }
}

module.exports = DetailView;