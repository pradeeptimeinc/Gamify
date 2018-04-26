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
      recivedMessage: [],
      initailLoad:true,
      text: ''
    }
  }

  componentDidMount() {
    const db = firebase.database();
    db.ref('/messages').orderByChild('sender').equalTo(this.props.user.id).once('value', (snapshot) => {
      if(Object.values(snapshot.val())){
        let message = Object.values(snapshot.val());
        message=_.filter(message, ['recipent', this.props.navigation.state.params.id])
        this.setState({
         messages: message,
         initailLoad : false
        })
      }
    });
    db.ref('/messages').orderByChild('sender').equalTo(this.props.navigation.state.params.id).once('value', (snapshot) => {
      if(Object.values(snapshot.val())){
        let recived = Object.values(snapshot.val());
        recived=_.filter(recived, ['recipent', this.props.user.id])
        this.setState({
         recivedMessage: recived,
         initailLoad : false
        })
      }
    });
    db.ref('/messages').orderByChild('sender').equalTo(this.props.user.id).on('child_added', this.onItemAdded)
    db.ref('/messages').orderByChild('sender').equalTo(this.props.navigation.state.params.id).on('child_added', this.onrecivedItemAdded)
  }

  onItemAdded =  (snapshot)=>{
    const {messages, initailLoad}  = this.state;
    if(!initailLoad){
       const newmgs = [snapshot.val(),...messages];
      this.setState({
        messages: newmgs
      })
    } 
  }

  onrecivedItemAdded = (snapshot)=>{
    const {recivedMessage, initailLoad}  = this.state;
    if(!initailLoad){
       const newrecivedmgs = [snapshot.val(),...recivedMessage];
      this.setState({
        recivedMessage: newrecivedmgs
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
    console.log("propsdata", this.props.user.id, item)
    return (this.props.user.id === item.sender) ?  (
      < View style={{ backgroundColor: 'white', flexDirection: "row", justifyContent: 'flex-start', margin: 3, borderTopRightRadius:30, borderBottomRightRadius:30 }}>
        <CardImage style={{ flex: 2, border: 1 }}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30, margin: 3, borderColor: "#d6d4d4", borderWidth: 3 }}
            source={{ uri: `${item.profile_url}` }}
          />
        </CardImage>
        <View style={{flex:3}}>
          <Text style={{ fontSize: 16, alignSelf: 'flex-start', margin:5 }}>{item.message}</Text>
          <Text style={{ fontSize: 12, alignSelf:'flex-end',color:'#444343', marginRight:10 }}>{moment(item.timestamp).format('MMMM Do, h:mm:ss a')}</Text>
        </View>
      </View>
    ) : 
    (< View style={{ backgroundColor: 'white', flexDirection: "row", justifyContent: 'flex-end', margin: 3, borderTopLeftRadius:30, borderBottomLeftRadius:30 }}>
      <View style={{flex:3}}>
        <Text style={{ fontSize: 16, alignSelf: 'flex-end', margin:5, marginRight:20 }}>{item.message}</Text>
        <Text style={{ fontSize: 12, alignSelf:'flex-start',color:'#444343', marginLeft:10 }}>{moment(item.timestamp).format('MMMM Do, h:mm:ss a')}</Text>
      </View>
      <CardImage style={{ flex: 2, border: 1 }}>
      <Image
        style={{ width: 60, height: 60, borderRadius: 30, margin: 3, borderColor: "#d6d4d4", borderWidth: 3 }}
        source={{ uri: `${item.profile_url}` }}
      />
    </CardImage>
    </View>)
  }

  chatMessages = (msgs) => {
    if(msgs && msgs.length > 0) {
      return(<FlatList          
      data={msgs}
      extraData={msgs}
      keyExtractor={(feed)=>{feed.timestamp}}
      renderItem={this.renderItem}
    />)
    } else {
      return (
        <Text> No Previous chat</Text>
      )
    } 
  }

  addNewFeed = () => {
    const db = firebase.database();
    const { user: {id}, navigation: { state: { params } }} = this.props
    if(this.state.text) {
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
    
    const { text, messages, recivedMessage } = this.state
    if(recivedMessage) {
      
      console.log("datata is::", messages.concat(recivedMessage))
    }
    
    const iconColor = text ? 'black': 'grey' 
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <View style={{backgroundColor: "white", height:60, margin:10, flexDirection: 'row', justifyContent:"flex-start", alignSelf:"flex-end", borderColor: 'grey', borderWidth: 2, borderRadius: 30}}>
          <TextInput 
          placeholder="New Message"
          style={{ backgroundColor: "white", width:"85%", marginLeft:20, height:53, alignSelf: 'center' }}
          onChangeText={(text) => this.setState({text})}
          value={text}/> 
          <AddIcon style={{alignSelf:"center", color: iconColor}}  name='send' size={30} onPress={this.addNewFeed} />
        </View>
        {
          recivedMessage && this.chatMessages(messages.concat(recivedMessage))
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