import React, { Component, } from 'react';
import { FlatList, ActivityIndicator, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {
  Text,
  View
} from 'react-native';
// import { Card, ListItem, Button } from 'react-native-elements'
import firebase from '../../Firebase';
import _ from 'lodash';
import {
  Card,
  CardTitle,
  CardImage,
  CardContent,
  CardAction
} from '../../components/Card'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topEmp: [],
      starEmp: [],
      spotEmp: []
    }
  }
  componentDidMount() {
    const db = firebase.database();
    // const query = db.ref('/employees').orderByChild('points');

    db.ref('/employees').once('value', (snapshot) => {

      const emps = Object.values(snapshot.val());
      console.log('snapshot', emps);
      let empsTop = _.orderBy(emps, ['points'], ['desc']);
      empsTop = empsTop.splice(0, 5);

      let spotEmp = _.filter(emps, ['spot', true]);
      // spotEmp = spotEmp.splice(0, 5);
      console.log('empsSpot', spotEmp);
      let starEmp = _.filter(emps, ['star', true]);
      this.setState({
        topEmp: empsTop,
        spotEmp: spotEmp,
        starEmp: starEmp
      })
    });
  }
  renderItem = ({ item }) => {
    return (
      <View key={item.id} >
        <Card style={{ backgroundColor: 'white', height: 200, width: 200, justifyContent: 'center', margin: 5 }}>
          <CardImage style={{ border: 1, borderColor: 'gray' }}>
            <Image
              style={{ width: 200, height: 150 }}
              source={{ uri: 'https://getmdl.io/assets/demos/image_card.jpg' }}
            />
          </CardImage>
          <Text style={{ fontSize: 20, alignItems: 'center' }}>{item.first_name}</Text>
        </Card>
      </View>
    )
    // return ()
  }
  renderPointItem = ({ item }) => {
    return (
      <View key={item.id} >
        <Card style={{ backgroundColor: 'white', height: 200, width: 200, justifyContent: 'center', margin: 5 }}>
          <CardImage style={{ border: 1, borderColor: 'gray' }}>
            <Image
              style={{ width: 200, height: 150 }}
              source={{ uri: 'https://getmdl.io/assets/demos/image_card.jpg' }}
            />
          </CardImage>
          <Text style={{ fontSize: 20, alignItems: 'center' }}>{item.first_name}</Text>
          <Text style={{ fontSize: 20, alignItems: 'center' }}>{item.points}</Text>
        </Card>
      </View>
    )
    // return ()
  }
  showTopList = (employees) => {
    if (employees && employees.length > 0) {
      return (<FlatList
        horizontal
        data={employees}
        keyExtractor={(emp) => emp.id}
        renderItem={this.renderPointItem}
      // numColumns={2}
      />)
    } else {
      return (
        <ActivityIndicator size='large' />
      )
    }
  }
  showSpotList = (employees) => {
    if (employees && employees.length > 0) {
      return (<FlatList
        horizontal
        data={employees}
        keyExtractor={(emp) => emp.id}
        renderItem={this.renderItem}
      // numColumns={2}
      />)
    } else {
      return (
        <ActivityIndicator size='large' />
      )
    }
  }
  showStar = (employees) => {
    if (employees && employees.length > 0) {
      return (<FlatList
        horizontal
        data={employees}
        keyExtractor={(emp) => emp.id}
        renderItem={this.renderItem}
      // numColumns={2}
      />)
    } else {
      return (
        <ActivityIndicator size='large' />
      )
    }
  }

  render() {
    const { topEmp, spotEmp, starEmp } = this.state;
    console.log('emps', this.state.topEmp)
    return (
      <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
        <Card style={{ backgroundColor: 'white', flex: 1, margin: 30, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25 }}> User Points 2000</Text>
        </Card>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, alignItems: 'center' }}>Top Scorer</Text>

          {

            this.showTopList(topEmp)
          }
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={{ fontSize: 20, alignItems: 'center' }}>Star Award Winners</Text>

          {
            this.showStar(spotEmp)
          }
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={{ fontSize: 20, alignItems: 'center' }}>Spot Award Winners</Text>

          {
            this.showSpotList(starEmp)
          }
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    issues: state,
  }
}
export default connect(mapStateToProps)(Home);

