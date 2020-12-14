import React, {useEffect, useState} from 'react'
import classes from './quizList.module.scss'
import {NavLink} from "react-router-dom";
import axios from "axios";

import Loader from "../../components/UI/Loader/Loader";

const QuizList = (props) => {

    const [quizes, setQuizes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('https://reactquiz-b6d47-default-rtdb.firebaseio.com/quiz/quizes.json')
            .then(response => {
                // console.log(response.data)
                const q = []
                Object.keys(response.data).forEach((item, index) => {
                    q.push({
                        id: index,
                        quiz: item
                    })
                })
                console.log("quizes:", q)

                setQuizes(q)
                setLoading(false)
            })
    }, [])

    const renderQuizes = () => {
        return (
            quizes.map((quiz, index) => {
                return (
                    <li key={index}>
                        <NavLink
                            to={`quiz/${quiz.quiz}`}
                        >
                            Тест {quiz.quiz}
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
                {loading
                    ? <Loader/>
                    : <ul>
                        {
                            renderQuizes()
                        }
                    </ul>
                }
            </div>

        </div>
    )
}

export default QuizList