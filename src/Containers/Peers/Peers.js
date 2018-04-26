import React from 'react';
import { View, Text, FlatList } from 'react-native';
import firebase from '../../Firebase';
import { connect } from 'react-redux'
class Peers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      peers: [],
    }
  }
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
    this.props.navigation.navigate('Chat', { title: item.first_name });
  }
  renderItem = ({ item }) => {
    console.log('item ic ', item);
    return (
      <View >
        <Text onPress={() => this.openChat(item)} style={{ fontSize: 25, alignItems: 'center', margin: 5 }}>{item.first_name}</Text>
      </View>

      // < View style={{ backgroundColor: 'gray', flexDirection: "row", justifyContent: 'flex-start', justifyContent: 'center', margin: 5 }}>
      //   {/* <CardImage style={{ flex: 2, border: 1 }}>
      //     <Image
      //       style={{ width: 60, height: 60, borderRadius: 30, margin: 3, borderColor: "#d6d4d4", borderWidth: 3 }}
      //       source={{ uri: `${item.image}` }}
      //     />
      //   </CardImage> */}
      //   <View style={{ flex: 3 }}>
      //     <Text style={{ fontSize: 16, alignItems: 'center', margin: 5 }}>{item.first_name}</Text>
      //     {/* <View style={{ flexDirection: "row", alignItems: 'flex-end', height: 30 }}>
      //       <Text style={{ flex: 3, fontSize: 12, fontWeight: 'bold', color: '#bab8b8' }}>{item.author}</Text>
      //       <Text style={{ flex: 4, fontSize: 12, alignSelf: 'flex-end', color: '#444343' }}>{moment(item.timestamp).format('MMMM Do, h:mm:ss a')}</Text>
      //     </View> */}
      //   </View>
      // </View>
    )
    // return ()
  }
  render() {
    console.log('this.user', this.state.peers);
    const { peers } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          ItemSeparatorComponent={this.FlatListItemSeparator}
          data={peers}
          extraData={peers}
          keyExtractor={(peer) => { peer.id }}
          renderItem={this.renderItem}
        />)
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  console.log('state in peers', state);
  return {
    user: state.user,
  }
}
export default connect(mapStateToProps)(Peers);