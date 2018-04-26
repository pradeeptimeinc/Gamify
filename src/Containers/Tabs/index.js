import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import HomeScreen from '../Home';
import FeedScreen from '../Feed';
import QuizScreen from '../Quiz';
import QuizDetailsScreen from '../QuizDetails';

export const QuizStack = StackNavigator({
  Quiz: {
    screen: QuizScreen,
    navigationOptions: {
      title: 'Quiz',
    },
  },
  QuizDetails: {
    screen: QuizDetailsScreen,
  },
});

export default TabNavigator({
  Home: { screen: HomeScreen },
  Feed: { screen: FeedScreen },
  Quiz: { screen: QuizStack },
});