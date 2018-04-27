import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from '../../Firebase';
import { connect } from 'react-redux'
import Peers from './Peers';
import Chat from './Chat';

export default StackNavigator({
  Peers: {
    screen: Peers,
  },
  Chat: {
    screen: Chat
  }
});