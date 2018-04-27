import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import HomeScreen from '../Home';
import FeedScreen from '../Feed';
import QuizScreen from '../Quiz';
import PeersScreen from '../Peers';

export default TabNavigator({
  Home: { screen: HomeScreen },
  Feed: { screen: FeedScreen },
  Quiz: { screen: QuizScreen },
  Peers: { screen: PeersScreen },
},
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Feed') {
          iconName = `ios-paper${focused ? '' : '-outline'}`;
        } else if (routeName === 'Quiz') {
          iconName = `ios-help-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Peers') {
          iconName = `ios-chatbubbles${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#1b7ff9',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  });