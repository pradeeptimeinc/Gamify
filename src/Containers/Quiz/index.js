import React, { Component } from 'react';
import { Text, View, FlatList, ListItem, ActivityIndicator } from 'react-native';
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
          console.log('final quiz', parsedQuiz);
          this.setState({
            quiz: parsedQuiz
          })          
        });
    }
      
      renderItem = ({ item })=> {        
        console.log("Render Item",item.quiz)
        return (        
        <View style={{ flexDirection: 'row', backgroundColor: 'white', elevation: 4,  margin: 20 }}>
        <Text key={item.key} style={{ fontSize: 18}}>{item.question_id+')'}</Text>
        <Text key={item.key} style={{ fontSize: 18,paddingLeft: 10}}>{item.question}</Text>
        </View> 
      )
    }
    
      renderQuestions() {
        const { quiz } = this.state
        console.log('renderQuestions State ',this.state)
        console.log('renderQuestions quiz ',quiz)
        return (
        <View style={{ backgroundColor: 'white', flex: 1, marginTop:40 }}>
        {
          <FlatList
          ItemSeparatorComponent = {this.FlatListItemSeparator}                    
          data = {quiz}   
          keyExtractor={(quiz) => quiz.question_id}       
          renderItem  = {this.renderItem}
        />
        }
      </View>)
      }
      FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#607D8B",
            }}
          />
        );
      }      
        render() {    
          if (this.state.quiz.length > 0) {
             return this.renderQuestions()
          }           
          else {
          return(                
                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center',alignItems: 'center',flex: 1 }}>
                  <ActivityIndicator size='large' />
                </View>
          );
        }
        }
}
