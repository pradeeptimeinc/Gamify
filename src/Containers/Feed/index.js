import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, TextInput,Image } from 'react-native'
import AddIcon from 'react-native-vector-icons/MaterialIcons' 
import firebase from '../../Firebase'
import moment from 'moment'
import {
  Card,
  CardTitle,
  CardImage,
  CardContent,
  CardAction
} from '../../components/Card'
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
      < View style={{ backgroundColor: 'white',flexDirection:"row", justifyContent: 'flex-start', justifyContent: 'center', margin: 5 }}>
        <CardImage style={{ flex:2, border: 1 }}>
          <Image
            style={{ width: 75, height: 75, borderRadius: 35, margin:3 }}
            source={{ uri: `${item.image}` }}
          />
        </CardImage>
        <View style={{flex:3}}>
          <Text key={item.id} style={{ fontSize: 16, alignItems: 'center', margin:5 }}>{item.content}</Text>
          <View style={{flexDirection:"row",alignItems:'flex-end', height:50}}>
            <Text key={item.id} style={{ flex:3,fontSize: 12, fontWeight: 'bold', color:'#bab8b8' }}>Prashant</Text>
            <Text key={item.id} style={{ flex:4,fontSize: 12, alignSelf:'flex-end',color:'#444343' }}>{moment(Date.now()).format('MMMM Do, h:mm:ss a')}</Text>
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
          alignSelf:'center',
          height: 1,
          width: "90%",
          backgroundColor: "#eeeeee",
        }}
      />
    );
  }

  showFeeds = (feeds) => {
    console.log("show feeds::", Object.values(feeds))
    let feedsToShow = Object.values(feeds)
    const key = Object.keys(feeds)
    console.log("Keys::",key)
    if(feedsToShow && feedsToShow.length > 0) {
      return(<FlatList
      ItemSeparatorComponent = {this.FlatListItemSeparator}          
      data={feedsToShow}
      extraData={feedsToShow}
      keyExtractor={(key)=>{key}}
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
    db.ref('/feeds').push().set({
        content: "this is a dummty content added 2",
        id:1083,
        timestamp: Date.now(),
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Hopetoun_falls.jpg/600px-Hopetoun_falls.jpg"
    });
  }
  render() {
    const { feeds } = this.state
    console.log("feeds::", feeds)
    return (
      <View style={{ backgroundColor: 'white', flex: 1, marginTop: 20 }}>
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

