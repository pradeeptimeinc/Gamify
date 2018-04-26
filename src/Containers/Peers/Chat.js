import React from 'react';
import { View, Text, TextInput, FlatList, Image, ActivityIndicator } from 'react-native';
import AddIcon from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'
import { connect } from 'react-redux'
import firebase from '../../Firebase'
import {
  Card,
  CardTitle,
  CardImage,
  CardContent,
  CardAction
} from '../../components/Card'
import _ from 'lodash'
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      initailLoad: true,
      text: ''
    }
  }

  componentDidMount() {
    console.log("did mount....", this.props.user.id, this.props.navigation.state.params.id)
    const db = firebase.database();
    db.ref('/messages').orderByChild('sender').equalTo(this.props.user.id).once('value', (snapshot) => {
      console.log('waejhvwhge', (Object.values(snapshot.val())))
      if (Object.values(snapshot.val())) {
        let message = Object.values(snapshot.val());
        message = _.filter(message, ['recipent', this.props.navigation.state.params.id])
        console.log('final obj', message);
        this.setState({
          messages: message,
          initailLoad: false
        })
      }
    });
    db.ref('/messages').orderByChild('sender').equalTo(this.props.user.id).on('child_added', this.onItemAdded)
  }
  onItemAdded = (snapshot) => {
    const { messages, initailLoad } = this.state;
    if (!initailLoad) {
      const newmgs = [snapshot.val(), ...messages];
      this.setState({
        messages: newmgs
      })
    }

  }
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.title : 'A Nested Details Screen',
    }
  };

  renderItem = ({ item }) => {
    console.log("dataa", item)
    return (
      <View style={{ flex: 3 }}>
        <Text style={{ fontSize: 16, alignItems: 'center', margin: 5 }}>{item.message}</Text>
        <View style={{ flexDirection: "row", alignItems: 'flex-end', height: 30 }}>
          <Text style={{ flex: 3, fontSize: 12, fontWeight: 'bold', color: '#bab8b8' }}>{item.sender}</Text>
          <Text style={{ flex: 4, fontSize: 12, alignSelf: 'flex-end', color: '#444343' }}>{moment(item.timestamp).format('MMMM Do, h:mm:ss a')}</Text>
        </View>
      </View>
    )
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
          height: 1,
          width: "90%",
          backgroundColor: "#d6d4d4",
        }}
      />
    );
  }

  chatMessages = (msgs) => {
    if (msgs && msgs.length > 0) {
      return (<FlatList
        ItemSeparatorComponent={this.FlatListItemSeparator}
        data={msgs}
        extraData={msgs}
        keyExtractor={(feed) => { feed.timestamp }}
        renderItem={this.renderItem}
      />)
    } else {
      return (
        <Text> No Previous chat</Text>
      )
    }
  }

  addNewFeed = () => {
    console.log("PROPS::", this.props)
    const db = firebase.database();
    const { user: { id }, navigation: { state: { params } } } = this.props
    if (this.state.text) {
      console.log("data", this.state.text)
      db.ref('/messages').push().set({
        recipent: params.id,
        sender: id,
        message: this.state.text,
        timestamp: Date.now(),
      });
    }
    this.setState({
      text: ''
    })
  }

  render() {

    const { text, messages } = this.state
    const iconColor = text ? 'black' : 'grey'
    console.log("mgs in render::", messages)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <View style={{ backgroundColor: "white", height: 60, margin: 10, flexDirection: 'row', justifyContent: "flex-start", alignSelf: "flex-end", borderColor: 'grey', borderWidth: 2, borderRadius: 30 }}>
          <TextInput
            placeholder="New Message"
            style={{ backgroundColor: "white", width: "85%", marginLeft: 20, height: 53, alignSelf: 'center' }}
            onChangeText={(text) => this.setState({ text })}
            value={text} />
          <AddIcon style={{ alignSelf: "center", color: iconColor }} name='send' size={30} onPress={this.addNewFeed} />
        </View>
        {
          this.chatMessages(messages)
        }

      </View>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}
export default connect(mapStateToProps)(Chat);
