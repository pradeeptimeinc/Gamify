import React, { Component, } from 'react';
import { FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import {
  Text,
  View
} from 'react-native';
// import { Card, ListItem, Button } from 'react-native-elements'
import firebase from '../../Firebase';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: []
    }
  }
  componentDidMount() {
    const db = firebase.database();
    db.ref('/employees').once('value', (snapshot) => {
      const emps = snapshot.val();
      console.log('snapshot', emps);
      this.setState({
        employees: emps
      })
    });
  }
  renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: 'white', elevation: 4, height: 200, width: 100, justifyContent: 'center', margin: 5 }}>
        <Text key={item.id} style={{ fontSize: 20, alignItems: 'center' }}>{item.first_name}</Text>
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
    const { employees } = this.state;
    console.log('emps', this.state.employees)
    return (
      <View style={{ backgroundColor: 'blue', flex: 1 }}>
        {
          this.showTopList(employees)
        }
        {
          this.showTopList(employees)
        }

      </View>
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

