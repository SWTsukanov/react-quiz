import React, {Component} from 'react'
import classes from './quiz.module.scss'

import ActiveQuiz from "../../components/ActiveQuize/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizByID} from "../../store/actions/quiz";


class Quiz extends Component {
    // state = {
    //     results: {},
    //     isFinished: false,
    //     activeQuestion: 0,
    //     answerState: null,//{id: 'success' 'error'}
    //     loading: true,
    //     quiz: []
    // }


    onAnswerClickHandler = (answerId) => {
        // console.log('Answer Id: ',answerId)

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
       this.props.fetchQuizByID(this.props.match.params.id)
    }

    render() {
        console.log(this.props)
        return (
            <div className={classes.quiz}>

                <div className={classes.quizWrapper}>
                    <h1>Ответьте на вопросы</h1>
                    {this.props.loading || this.props.quiz.length===0
                        ? <Loader/>
                        :
                        this.props.isFinished
                            ?
                            <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onClickHandler={this.onButtonClickHandler}
                            />
                            : <ActiveQuiz
                                question={this.props.quiz[this.props.activeQuestion].question}
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion}
                                rightOrNot={this.props.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,//{id: 'success' 'error'}
        loading: state.quiz.loading,
        quiz: state.quiz.quiz
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        fetchQuizByID: id=>dispatch(fetchQuizByID(id)),
        quizAnswerClick: answerID=>dispatch(quizAnswerClick(answerID))
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Quiz)