import React from 'react'
import classes from './AnswerItem.module.scss'
const AnswerItem = (props) =>{
    const cls = [classes.answerItem]

    if (props.rightOrNot){
        cls.push(classes[props.rightOrNot])
    }
    return(
        <li
            className={cls.join(' ')}
            onClick={()=>{
                props.onAnswerClick(props.answer.id)
            }}
        >
            {props.answer.text}
        </li>
    )

}

export default AnswerItem