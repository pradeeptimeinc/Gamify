import React, { Component } from 'react';
import {
  // Platform,
  // StyleSheet,
  Text,
  View
} from 'react-native';

export default class QuizDetails extends Component {
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
          quiz: this.props.navigation.state.params,
          ansIndex: 1000
        }        
    }
    
    componentDidMount() { 
        
    }

    onClickAnswer=(option, index)=>{
        console.log('Answer '+option);
        // console.log(this.refs);
        this.setState({
            ansIndex: index
        })
        this.props.navigation.goBack(null)
    }

    renderAnswerOptions(options) {                
            let arr=[];           
            options.map((option, index) => {
            let color = this.state.ansIndex == index ? 'red' : 'gray';
              arr.push(  
                <Text ref={index} key = {index} style={{ fontSize: 25,color: color ,paddingTop: 15}} onPress = {()=>this.onClickAnswer(option, index)} >
                      {index+') '}{option}
                </Text>
            )
       })       
       return arr;
    }

    render() {
        
    return (
      <View style={{  backgroundColor: 'white', flex: 1,  elevation: 4}}>
        <Text style={{ fontSize: 30,color: 'grey',paddingLeft: 10}} >
             {this.state.quiz.question} 
        </Text>
        <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1,  elevation: 4, marginTop: 20 }}>  
                {
                    this.renderAnswerOptions(this.state.quiz.options)
                }            
            {/* <Text style={{ fontSize: 25,color: 'grey',paddingTop: 15}} >
                {'a) '+this.state.quiz.options[0]}
            </Text>
            <Text style={{ fontSize: 25,color: 'grey',paddingTop: 15}} >
                {'b) '+this.state.quiz.options[1]} 
            </Text>
            <Text style={{ fontSize: 25,color: 'grey',paddingTop: 15}} >
                {'c) '+this.state.quiz.options[2]} 
            </Text>
            <Text style={{ fontSize: 25,color: 'grey',paddingTop: 15}} >
                {'d) '+this.state.quiz.options[3]} 
            </Text> */}
        </View>
      </View>
    );
  }
}

