import React, { Component, } from 'react';
import { FlatList, ActivityIndicator, Image, ScrollView, StyleSheet, Modal } from 'react-native'
import { connect } from 'react-redux'
import {
  Text,
  View,
} from 'react-native';
import AnimateNumber from 'react-native-countup'
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
      spotEmp: [],
      userPoints: 0
    }
  }
  componentDidMount() {
    const db = firebase.database();
    // const query = db.ref('/employees').orderByChild('points');
    db.ref('/employees').once('value', (snapshot) => {
      const emps = Object.values(snapshot.val());
      let empsTop = _.orderBy(emps, ['points'], ['desc']);
      empsTop = empsTop.splice(0, 5);
      let spotEmp = _.filter(emps, ['spot', true]);
      // spotEmp = spotEmp.splice(0, 5);
      let starEmp = _.filter(emps, ['star', true]);
      this.setState({
        topEmp: empsTop,
        spotEmp: spotEmp,
        starEmp: starEmp
      })
    });
    this.setState({
      userPoints: this.props.user.points
    })
  }
  renderItem = ({ item }) => {
    return (
      <View key={item.id} >
        <Card style={{ backgroundColor: '#eee', height: 200, width: 200, margin: 5 }}>
          <CardImage style={{ border: 1, borderColor: 'gray', justifyContent: 'center', elevation: 4 }}>
            <Image
              style={{ width: 200, height: 150 }}
              source={{ uri: `${item.profile_url}` }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>{item.first_name} {item.last_name}</Text>
          </CardImage>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 15 }}>{item.team}</Text>
          </View>
        </Card>
      </View>
    )
    // return ()
  }
  renderPointItem = (props) => {
    const { item, index } = props;
    return (
      <View key={item.id} >
        <Card style={{ backgroundColor: 'white', height: 85, width: 270, flexDirection: "row", justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 8, marginTop: 5, marginRight: 5, marginBottom: 5, borderRadius: 55, borderWidth: 3, borderColor: "#bab8b8" }}>
          <CardImage style={{ flex: 2, border: 1, borderColor: 'gray' }}>
            <Image
              style={{ width: 75, height: 75, borderRadius: 35, margin: 3 }}
              source={{ uri: `${item.profile_url}` }}
            />
          </CardImage>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', marginTop: 15, marginLeft: 30 }}>
            <Text style={{ fontSize: 20, alignSelf: 'flex-start', fontWeight: 'bold', color: '#444343' }}>{item.first_name}</Text>
            <Text style={{ fontSize: 20, alignSelf: 'flex-start', fontWeight: 'bold', color: '#bab8b8' }}>{item.points} points</Text>
          </View>
          <View style={{ backgroundColor: 'gold', position: 'absolute', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', borderRadius: 30, borderColor: 'white', borderWidth: 3, marginLeft: -10, paddingVertical: -40 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }} >{index + 1}</Text>
          </View>
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
        showsHorizontalScrollIndicator={false}
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
        showsHorizontalScrollIndicator={false}
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
        showsHorizontalScrollIndicator={false}
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
    const { user } = this.props;
    return (
      <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
        <Card style={{ backgroundColor: 'white', flex: 1, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Image
              style={[styles.logo, {
                resizeMode: Image.resizeMode.contain,
              },]}
              source={require('../../assets/Points.jpg')}
            />
            <Text style={{ height: 50, marginTop: 25, marginLeft: 5, fontSize: 20, fontWeight: 'bold', }}>
              <AnimateNumber value={user.points} countBy={5} timing="easeOut" />
            </Text>
          </View>
        </Card>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 22, alignItems: 'center', fontWeight: 'bold' }}>Top 5 Scorer</Text>
          {
            this.showTopList(topEmp)
          }
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={{ fontSize: 22, alignItems: 'center', fontWeight: 'bold' }}>Star Award Winners</Text>
          {
            this.showStar(spotEmp)
          }
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={{ fontSize: 22, alignItems: 'center', fontWeight: 'bold' }}>Spot Award Winners</Text>
          {
            this.showSpotList(starEmp)
          }
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    maxHeight: 200,
  }
})
const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}
export default connect(mapStateToProps)(Home);