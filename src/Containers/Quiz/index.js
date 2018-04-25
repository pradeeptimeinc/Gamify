import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from '../../Firebase';
import { connect } from 'react-redux';

export default class Quiz extends Component { 
    
    constructor(props) {
        super(props)                
        this.state = {quiz:[]}        
    }
    
      componentDidMount() {
        const db = firebase.database();
        db.ref('/quiz').once('value', (snapshot) => {
          const dbQuiz = snapshot.val();
          this.setState({
            quiz: dbQuiz
          })          
        });
      }
        render() {
          if(this.state.quiz.length >0 ) {
            return (
                <View style={{ backgroundColor: 'red', flex: 1, marginTop: 20 }}>
                  <Text >
                    Loaded quiz 
                  </Text>
                </View>
              );
          }  
          else {
            return (
                <View style={{ backgroundColor: 'red', flex: 1, marginTop: 20 }}>
                  <Text >
                    Welcome to Quiz
                  </Text>
                </View>
              );
          }
          
        }
}
