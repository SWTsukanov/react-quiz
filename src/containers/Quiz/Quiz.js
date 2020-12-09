import React, {Component} from 'react'
import classes from './quiz.module.scss'

import ActiveQuiz from "../../components/ActiveQuize/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";


class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,//{id: 'success' 'error'}
        quiz: [
            {
                id: 1,
                question: 'Кто бросил молот и перо на Луну, чтобы продемонстрировать, что без воздуха они падают с одинаковой скоростью?',
                answers: [
                    {text: "Норм Ларсен", id: 1},
                    {text: "Юрий Гагарин", id: 2},
                    {text: "Дэвид Р. Скотт", id: 3},
                    {text: "Альберт Энштейн", id: 4}
                ],
                rightAnswerId: 3
            },
            {
                id: 2,
                question: 'Сколько сердец у Осьминога?',
                answers: [
                    {text: "Одно", id: 1},
                    {text: "Два", id: 2},
                    {text: "Три", id: 3},
                    {text: "Четыре", id: 4}
                ],
                rightAnswerId: 3
            },
            {
                id: 3,
                question: 'Какая самая большая молекула является частью человеческого тела?',
                answers: [
                    {text: "Хромосома 1", id: 1},
                    {text: "РНК", id: 2},
                    {text: "ДНК", id: 3},
                    {text: "H2O", id: 4}
                ],
                rightAnswerId: 1
            }
        ]
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
            isFinished : false,
            activeQuestion : 0,
            answerState : null,
            results : {}
        })
    }

    render() {
        return (
            <div className={classes.quiz}>

                <div className={classes.quizWrapper}>
                    <h1>Ответьте на вопросы</h1>
                    {
                        this.state.isFinished
                            ?
                            <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onClickHandler = {this.onButtonClickHandler}
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