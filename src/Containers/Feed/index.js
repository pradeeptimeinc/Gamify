import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, TextInput, Image } from 'react-native'
import AddIcon from 'react-native-vector-icons/MaterialIcons'
import firebase from '../../Firebase'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  Card,
  CardTitle,
  CardImage,
  CardContent,
  CardAction
} from '../../components/Card'

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
      initailLoad: true,
      modalVisible: false,
      text: ''
    }
  }

  componentDidMount() {
    const db = firebase.database();
    db.ref('/feeds').once('value', (snapshot) => {
      const feed = Object.values(snapshot.val());
      this.setState({
        feeds: feed,
        initailLoad: false
      })
    });
    db.ref('/feeds').on('child_added', this.onItemAdded)
  }
  onItemAdded = (snapshot) => {
    const { feeds, initailLoad } = this.state;
    if (!initailLoad) {
      const newfeeds = [snapshot.val(), ...feeds];
      this.setState({
        feeds: newfeeds
      })
    }

  }

  renderItem = ({ item }) => {
    return (
      < View style={{ backgroundColor: 'white', flexDirection: "row", justifyContent: 'flex-start', justifyContent: 'center', margin: 5 }}>
        <CardImage style={{ flex: 2, border: 1 }}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30, margin: 3, borderColor: "#d6d4d4", borderWidth: 3 }}
            source={{ uri: `${item.image}` }}
          />
        </CardImage>
        <View style={{ flex: 3 }}>
          <Text style={{ fontSize: 16, alignItems: 'center', margin: 5 }}>{item.content}</Text>
          <View style={{ flexDirection: "row", alignItems: 'flex-end', height: 30 }}>
            <Text style={{ flex: 3, fontSize: 12, fontWeight: 'bold', color: '#bab8b8' }}>{item.author}</Text>
            <Text style={{ flex: 4, fontSize: 12, alignSelf: 'flex-end', color: '#444343' }}>{moment(item.timestamp).format('MMMM Do, h:mm:ss a')}</Text>
          </View>
        </View>
      </View>
    )
    // return ()
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

  showFeeds = (feeds) => {
    if (feeds && feeds.length > 0) {
      return (<FlatList
        ItemSeparatorComponent={this.FlatListItemSeparator}
        data={feeds}
        extraData={feeds}
        keyExtractor={(feed) => { feed.timestamp }}
        renderItem={this.renderItem}
      />)
    } else {
      return (
        <ActivityIndicator size='large' />
      )
    }
  }

  addNewFeed = () => {
    const db = firebase.database();
    const { first_name, profile_url, id } = this.props.user;
    if (this.state.text) {
      db.ref('/feeds').push().set({
        author: first_name,
        content: this.state.text,
        id: id,
        timestamp: Date.now(),
        image: profile_url
      });
    }
    this.setState({
      text: ''
    })
  }

  render() {
    const { feeds, modalVisible, text } = this.state
    const iconColor = text ? 'black' : 'grey'
    return (
      <View style={{ backgroundColor: 'white', flex: 1, marginTop: 20 }}>
        <View style={{ height: 60, margin: 10, flexDirection: 'row', justifyContent: "flex-start", borderColor: 'grey', borderWidth: 2, borderRadius: 30 }}>
          <TextInput
            placeholder="Post New Feed"
            style={{ backgroundColor: "white", width: "85%", marginLeft: 20, height: 53, alignSelf: 'center' }}
            onChangeText={(text) => this.setState({ text })}
            value={text} />
          <AddIcon style={{ alignSelf: "center", color: iconColor }} name='send' size={30} onPress={this.addNewFeed} />
        </View>
        {
          this.showFeeds(feeds)
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
export default connect(mapStateToProps)(Feed);