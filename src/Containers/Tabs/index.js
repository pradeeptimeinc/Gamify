import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import HomeScreen from '../Home';
import FeedScreen from '../Feed';

export default TabNavigator({
  Home: { screen: HomeScreen },
  Feed: { screen: FeedScreen },
});