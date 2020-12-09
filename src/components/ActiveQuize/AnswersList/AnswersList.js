import React from 'react'
import classes from './answersList.module.scss'

import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = (props) =>{
    return(
        <ul className={classes.answersList}>
            {props.answers.map((answer,index)=>{
               return(
                       <AnswerItem
                           answer={answer}
                           key={index}
                           onAnswerClick = {props.onAnswerClick}
                           rightOrNot = {props.rightOrNot ? props.rightOrNot[answer.id] : null}
                       />
                   )

            })}
        </ul>
    )
}
export default AnswersList