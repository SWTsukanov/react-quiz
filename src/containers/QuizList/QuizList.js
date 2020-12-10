import React from 'react'
import classes from './quizList.module.scss'
import {NavLink} from "react-router-dom";

const QuizList = (props) =>{

    const renderQuizes = () => {
        return (
            [1,2,3].map((quiz,index)=>{
                return (
                    <li key={index}>
                        <NavLink
                            to={`quiz:${quiz}`}
                        >
                            Тест {quiz}
                        </NavLink>
                    </li>
                )
            })
        )
    }

    return (
        <div className={classes.quizList}>
            <div>
                <h1>Список Тестов</h1>
                <ul>
                    {
                        renderQuizes()
                    }
                </ul>
            </div>

        </div>
    )
}

export default QuizList