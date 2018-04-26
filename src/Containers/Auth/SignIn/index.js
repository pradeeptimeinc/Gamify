import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { Button, FormInput, FormValidationMessage } from 'react-native-elements'
import { connect } from 'react-redux'
import userAction from '../../../Redux/User'
import { bindActionCreators } from 'redux'
import { isEmpty } from 'lodash'
import firebase from '../../../Firebase';
import styles from './styles';
class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loginError: '',
      emailError: '',
      passwordError: '',
      fetching: false,
    }
  }
  validateEmail(value = '') {
    // const email = value.toLowerCase().trim() || this.state.email.toLowerCase().trim()
    // if (email.match(/@timeinc.com|@meredith.com/)) {
    //   this.setState({ email: email.replace(/@timeinc.com|@meredith.com/, '') })
    //   this.setState({ emailError: '' })
    // } else if (isEmpty(email) || !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) {
    //   this.setState({ emailError: 'Please enter valid email' })
    // } else {
    //   this.setState({ emailError: '' })
    // }
  }

  validatePassword(value = '') {
    const password = value || this.state.password
    if (isEmpty(password)) {
      this.setState({ passwordError: 'enter a valid password' })
    } else {
      this.setState({ passwordError: '' })
    }
  }
  signIn() {
    console.log('signin called')
    const { email, password, emailError, passwordError } = this.state
    this.setState({ loginError: '' })
    Promise.resolve(this.validateEmail())
      .then(this.validatePassword())
      .then(() => {
        console.log('calling dvgw')
        console.log(!isEmpty(email), !isEmpty(password), isEmpty(emailError), isEmpty(passwordError))
        if (!isEmpty(email) && !isEmpty(password) && isEmpty(emailError) && isEmpty(passwordError)) {
          console.log('calling db')
          const db = firebase.database();
          db.ref('employees').orderByChild("id").equalTo(email).once("value", snapshot => {
            const userData = Object.values(snapshot.val())[0];
            console.log('userData in signIn', userData);
            return this.props.userAction.setUser(userData);
          });
        }
      })
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <ScrollView style={styles.scrollView} >
          <Image
            style={[styles.logo, {
              resizeMode: Image.resizeMode.contain,
            }]}
            source={require('../../../assets/brand.jpeg')}
          />
          <View >
            <FormValidationMessage>
              {this.state.loginError}
            </FormValidationMessage>
            <FormInput
              returnKeyType={'next'}
              autoCorrect={false}
              keyboardType={'email-address'}
              onChangeText={email => {
                this.setState({ email })
                return this.validateEmail(email)
              }}
              placeholder='UserName'
              inputStyle={styles.input}
              // onSubmitEditing={() => { this.secondTextInput.focus() }}
              blurOnSubmit={false}
            />
            <FormValidationMessage>
              {this.state.emailError}
            </FormValidationMessage>
            <FormInput
              ref={(input) => { this.secondTextInput = input }}
              returnKeyType='done'
              autoCorrect={false}
              secureTextEntry
              onChangeText={password => {
                this.setState({ password })
                return this.validatePassword(password)
              }}
              placeholder={'Password'}
              inputStyle={styles.input}
            />
            <FormValidationMessage>
              {this.state.passwordError}
            </FormValidationMessage>
            <Text
              style={[styles.link, styles.forgotPassword]}
              onPress={() => { }}>
            </Text>
            <Button
              title={'login'}
              buttonStyle={styles.submitButton}
              disabledStyle={styles.disabledButton}
              // loading={this.state.fetching}
              // disabled={this.state.fetching}
              loadingRight
              rounded
              onPress={() => this.signIn()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  userAction: bindActionCreators(userAction, dispatch),
})
export default connect(null, mapDispatchToProps)(SignIn);