import React from 'react'

import classes from './activeQuiz.module.scss'
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = (props) =>{
    return(
        <div className={classes.activeQuiz}>
            <p className={classes.question}>
                <span>
                   <strong>{props.answerNumber + 1}.</strong>&nbsp;
                    {props.question}
                </span>
                <small>{props.answerNumber + 1} из {props.quizLength}</small>
            </p>
            <AnswersList
                answers={props.answers}
                onAnswerClick = {props.onAnswerClick}
                rightOrNot = {props.rightOrNot}
            />

        </div>
    )
}
export default ActiveQuiz