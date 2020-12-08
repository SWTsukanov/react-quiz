import React,{Component} from 'react'
import classes from './quiz.module.scss'

import ActiveQuiz from "../../components/ActiveQuize/ActiveQuiz";

class Quiz extends Component{
    state = {
        activeQuestion:0,
        quiz : [
            {id:1,
                question:'Вопрос 1',
                answers:[
                    {text:"Ответ 1", id:1},
                    {text:"Ответ 2", id:2},
                    {text:"Ответ 3", id:3},
                    {text:"Ответ 4", id:4}
                ],
                rightAnswerId : 1
            },
            {id:2,
                question:'Вопрос 2',
                answers:[
                    {text:"Ответ 11", id:1},
                    {text:"Ответ 22", id:2},
                    {text:"Ответ 33", id:3},
                    {text:"Ответ 44", id:4}
                ],
                rightAnswerId : 2
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log('Answer Id: ',answerId)
        this.setState({
            activeQuestion: this.state.activeQuestion + 1
        })
    }

    render(){
        return (
            <div className={classes.quiz}>

                <div className={classes.quizWrapper}>
                    <h1>Ответьте на вопросы</h1>
                    <ActiveQuiz
                        question = {this.state.quiz[this.state.activeQuestion].question}
                        answers = {this.state.quiz[this.state.activeQuestion].answers}
                        onAnswerClick = {this.onAnswerClickHandler}
                        quizLength ={this.state.quiz.length}
                        answerNumber = {this.state.activeQuestion}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz