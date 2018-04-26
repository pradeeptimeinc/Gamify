import React from 'react';
import { View, Text } from 'react-native';
export default class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.title : 'A Nested Details Screen',
    }
  };
render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>chat with </Text>
      </View>
    );
  }
}