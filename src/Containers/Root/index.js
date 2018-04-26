import React, { Component } from 'react';
import { View } from 'react-native'
import Tabs from '../Tabs';
import { connect } from 'react-redux'
import SignIn from '../Auth/SignIn';
class Root extends Component {
  render() {
    const { userLoginStatus = false } = this.props;
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        {
         // userLoginStatus ? <Tabs /> : <SignIn />
        }
        <Tabs/>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userLoginStatus: state.user.isLoggedIn,
  }
}
export default connect(mapStateToProps)(Root);