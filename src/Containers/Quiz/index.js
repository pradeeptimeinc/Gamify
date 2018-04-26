import React, { Component } from 'react';
import { Text, View, FlatList, ListItem, ActivityIndicator } from 'react-native';
import firebase from '../../Firebase';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { Card } from '../../components/Card'
export default class Quiz extends Component {

  constructor(props) {
    super(props)
    this.state = { quiz: [] }
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

  renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: 'white', elevation: 4, margin: 20 }}>
        <Text style={{ fontSize: 18 }} > {item.question_id + ')'} </Text>
        <Text key={item.question_id} style={{ fontSize: 18, paddingLeft: 10 }} onPress={this.onClickQuestion.bind(this, item)}>{item.question}</Text>
      </View>
    )
  }

  onClickQuestion(item) {
    console.log('item click', item)
    this.props.navigation.navigate('QuizDetails', { ...item });
  }

  renderQuestions() {
    const { quiz } = this.state
    console.log('renderQuestions State ', this.state)
    console.log('renderQuestions quiz ', quiz)
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        {
          <FlatList
            ItemSeparatorComponent={this.FlatListItemSeparator}
            data={quiz}
            keyExtractor={(quiz) => quiz.question_id}
            renderItem={this.renderItem}
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
      return this.renderCarousal()
    }
    else {
      return (
        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
  }

  onClickAnswer = (option, index)=>{
    console.log('Answer '+option);
    
}

  renderAnswerOptions(options) {
    console.log('renderAnswerOPtions', options)
    let arr = [];
    options.map((option, index) => {
      arr.push(
        <Text ref={index} key={index} style={{ fontSize: 16 }} onPress={() => this.onClickAnswer(option, index)} >
          {index + ') '}{option}
        </Text>
      )
    })
    return arr;
  }
  _renderItemCarousel = ({ item, index }) => {
    console.log('Item from renderItem carousel',item)
    return (
      <Card style={{ backgroundColor: 'white' }}>
        <View style={{}}>
          <View style={{width: 15, height: 30, backgroundColor: 'steelblue',marginLeft:15,marginTop:0}} />
          <Text style={{ fontSize: 20, padding: 15,fontWeight: 'bold' }}>{item.question}</Text>
        </View>
         <View>          
          {
            this.renderAnswerOptions(item.options)
          }
        </View>
      </Card>
    );
  }

  renderCarousal() {
    const { quiz } = this.state
    return (
      <Carousel
        layout='tinder'
        layoutCardOffset={quiz.length}
        ref={(c) => { this._carousel = c; }}
        data={quiz}
        renderItem={this._renderItemCarousel}
        sliderWidth={350}
        sliderHeight={100}
        containerCustomStyle={{ marginTop: 25, overflow: 'visible', marginBottom: 100, marginLeft: 10 }}
        itemWidth={300}
        itemHeight={300}
      />
    );
  }
}
