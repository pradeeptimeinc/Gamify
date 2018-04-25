import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
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
          const parsedQuiz = Object.values(dbQuiz)
          this.setState({
            quiz: parsedQuiz
          })          
        });
    }

      renderItem = ({ item })=> {
        return 
        <View style={{ backgroundColor: 'white', elevation: 4, height: 200, width: 100, justifyContent: 'center', margin: 5 }}>
        <Text key={item.id} style={{ fontSize: 20, alignItems: 'center' }}>{item.question}</Text>
      </View>
    }
      renderQuestions() {
        const { quiz } = this.state.quiz
        console.log('Quiz in render questions ',this.state)
        return (
        <View style={{ backgroundColor: 'blue', flex: 1 }}>
        {
          <FlatList
          horizontal
          data={quiz}
          keyExtractor={(quiz) => quiz.question_id}
          renderItem={this.renderItem}
        />
        }
      </View>)
      }
        render() {
          if(this.state.quiz.length >0 ) {
            return (
            //     <View style={{ backgroundColor: 'red', flex: 1, marginTop: 20 }}>
            //       <Text >
            //         Loaded quiz 
            //       </Text>
            //     </View>
                    this.renderQuestions()
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
