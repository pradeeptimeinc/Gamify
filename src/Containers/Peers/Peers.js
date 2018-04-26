import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import firebase from '../../Firebase'
import { connect } from 'react-redux'
import {
  CardImage
} from '../../components/Card'
class Peers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      peers: [],
    }
  }
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: 'Your Peers',
    }
  };
  componentDidMount() {
    const { user } = this.props;
    console.log('user', user);
    const db = firebase.database();
    db.ref('/employees').orderByChild('manager_id').equalTo('123').once('value', (snapshot) => {
      let { peers } = this.state;
      let emps = Object.values(snapshot.val());
      peers = [...emps, ...peers];
      // let userData =
      // emps = { ...emps }
      console.log('snapshot 1', peers);
      this.setState({
        peers: peers
      })
    });
    db.ref('/employees').orderByChild('id').equalTo(user.manager_id).once('value', (snapshot) => {
      let { peers } = this.state;
      let manager = Object.values(snapshot.val());
      peers = [...manager, ...peers];
      console.log('snapshot 2', peers);
      this.setState({
        peers: peers
      })
    });
  }
  openChat = (item) => {
    console.log('calling chat', { title: 'ejrfjerb' })
    this.props.navigation.navigate('Chat', { title: item.first_name, id: item.id, profilePic: item.profile_url });
  }
  renderItem = ({ item }) => {
    console.log('item ic ', item);
    return (
      < TouchableOpacity onPress={() => this.openChat(item)} style={{ backgroundColor: 'white', flexDirection: "row", justifyContent: 'flex-start', justifyContent: 'center' }}>
        <CardImage style={{ flex: 2, border: 1 }}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30, margin: 3, marginLeft: 10, borderColor: "#d6d4d4", borderWidth: 3 }}
            source={{ uri: `${item.profile_url}` }}
          />
        </CardImage>
        <Text style={{ flex: 3, fontSize: 20, alignSelf: 'center', margin: 5, color: '#444343' }}>{item.first_name}</Text>
      </TouchableOpacity>
    )
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
          height: 1,
          width: "100%",
          backgroundColor: "#d6d4d4",
        }}
      />
    );
  }

  render() {
    console.log('this.user', this.state.peers);
    const { peers } = this.state;
    return (
      <FlatList
        ItemSeparatorComponent={this.FlatListItemSeparator}
        data={peers}
        extraData={peers}
        keyExtractor={(peer) => { peer.id }}
        renderItem={this.renderItem}
      />);
  }
}
const mapStateToProps = (state) => {
  console.log('state in peers', state);
  return {
    user: state.user,
  }
}
export default connect(mapStateToProps)(Peers);