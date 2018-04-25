import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, TextInput,Image } from 'react-native'
import AddIcon from 'react-native-vector-icons/MaterialIcons' 
import firebase from '../../Firebase';
const arr =[1,2,3,4,5,6,7,8]
export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: {}
    }
  }

  componentDidMount() {
    const db = firebase.database();
    db.ref('/feeds').once('value', (snapshot) => {
      const feed = snapshot.val();
      console.log('snapshot', feed);
      this.setState({
       feeds: feed
      })
    });
  }

  renderItem = ({ item }) => {
    console.log(item)
    return (
      <View style={{ backgroundColor: 'white', elevation: 4, height: 200, justifyContent: 'center', margin: 5 }}>
        <Text key={item.id} style={{ fontSize: 20, alignItems: 'center' }}>{item.content}</Text>
        <Text key={item.id} style={{ fontSize: 20, alignItems: 'center' }}>{item.timestamp}</Text>
        <Image style={{width:100, height:100}} source={{uri:`${item.image}`}}></Image>
      </View>
    )
    // return ()
  }

  showFeeds = (feeds) => {
    console.log("show feeds::", Object.values(feeds))
    let feedsToShow = Object.values(feeds)
    if(feedsToShow && feedsToShow.length > 0) {
      return(<FlatList
      data={feedsToShow}
      // extraData={this.state.addNewFeed}
      keyExtractor={(feed) => feed.id}
      renderItem={this.renderItem}
    />)
    } 
  }
  addNewFeed = () => {
    const db = firebase.database();
    db.ref('/feeds/'+2).set({
        content: "this is a dummty content added 2",
        id:1083,
        timestamp:1112,
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Hopetoun_falls.jpg/600px-Hopetoun_falls.jpg"
    });
    // arr.unshift(arr[arr.length-1]+1);
    // this.setState({
    //   addNewFeed: this.state.addNewFeed+1
    // })
  }
  render() {
    const { feeds } = this.state
    console.log("feeds::", feeds)
    return (
      <View style={{ backgroundColor: 'grey', flex: 1, marginTop: 20 }}>
        <Text >
          Welcome to Feed
        </Text>
        <View style={{height:40, margin:10, flexDirection: 'row', justifyContent:"flex-start"}}>
          <TextInput style={{ backgroundColor: "white", width:"90%"}}/> 
          <AddIcon style={{alignSelf:"center"}}  name='note-add' size={25} onPress={this.addNewFeed} />
        </View>
        {
          this.showFeeds(feeds)
        }
      </View>
    );
  }
}

