import React, {Component} from 'react'
import classes from './quiz.module.scss'
import axios from '../../axios/axiosAPI'

import ActiveQuiz from "../../components/ActiveQuize/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";


class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,//{id: 'success' 'error'}
        loading: true,
        quiz: []
    }


    onAnswerClickHandler = (answerId) => {
        // console.log('Answer Id: ',answerId)
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                    console.log('Finished!')
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    onButtonClickHandler = () => {
        this.setState({
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
            results: {}
        })
    }

    async componentDidMount() {
        // console.log("Quiz id = ", this.props.match.params.id)
        try {
            const response = await axios.get(`quiz/quizes/${this.props.match.params.id}.json`)
            // console.log(response)
            // console.log(...(response.data))
            this.setState((prev)=>{
                return {
                    ...prev,
                    loading: false,
                     quiz: [...response.data]
                }
            })
        } catch (e) {
            console.error(e)
        }


    }

    render() {
        return (
            <div className={classes.quiz}>

                <div className={classes.quizWrapper}>
                    <h1>Ответьте на вопросы</h1>
                    {this.state.loading
                        ? <Loader/>
                        :
                        this.state.isFinished
                            ?
                            <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onClickHandler={this.onButtonClickHandler}
                            />
                            : <ActiveQuiz
                                question={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion}
                                rightOrNot={this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz