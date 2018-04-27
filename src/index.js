/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Root from './Containers/Root'
import RootReducer from './Redux';
const store = createStore(RootReducer)
export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <Root />
        </Provider>
      </View>
    );
  }
}

