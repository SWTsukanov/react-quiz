import React, {useEffect, useState} from 'react'
import classes from './quizList.module.scss'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

import Loader from "../../components/UI/Loader/Loader";
import {fetchQuizes} from "../../store/actions/quiz";


const QuizList = (props) => {

    useEffect(() => {
        props.fetchQuizes()
    }, [])

    const renderQuizes = () => {
        return (
            props.quizes.map((quiz, index) => {
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
                {props.loading
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

const mapStateToProps = (state) => {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizes: ()=>{
            dispatch(fetchQuizes())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)