import React, {useState} from 'react'
import axios from 'axios'
import classes from './quizCreator.module.scss'
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from "../../Form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";

const createOptionControl = (number) => {
    return (createControl({
            id: number,
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым'
        },
        {
            required: true
        }))
}

const createFormControls = () => {
    return (
        {
            question: createControl({
                    label: 'Введите вопрос',
                    errorMessage: 'Вопрос не может быть пустым'
                },
                {
                    required: true
                }),
            option1: createOptionControl(1),
            option2: createOptionControl(2),
            option3: createOptionControl(3),
            option4: createOptionControl(4),
        }
    )
}

const QuizCreator = (props) => {
    const [state, setState] = useState({
        quiz: [],
        rightAnswerId: 1,
        formControls: createFormControls(),
        formIsValid: false
    })

    const submitHandler = (e) => {
        e.preventDefault()
    }

    const addQuestionHandler = (e) => {
        e.preventDefault()

        const quiz = state.quiz.concat()
        const index = state.quiz.length + 1
        const {question, option1, option2, option3, option4} = state.formControls
        const questionItem = {
            id: index,
            question: question.value,
            rightAnswerId: state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }
        quiz.push(questionItem)

        setState((prevState) => {
            return {
                quiz,
                formIsValid: false,
                rightAnswerId: 1,
                formControls: createFormControls()
            }
        })
    }
    const createQuizHandler = async (e) => {
        e.preventDefault()
        try {
            await axios.post('https://reactquiz-b6d47-default-rtdb.firebaseio.com/quiz/quizes.json', state.quiz)
            setState((prevState) => {
                return {
                    quiz: [],
                    formIsValid: false,
                    rightAnswerId: 1,
                    formControls: createFormControls()
                }
            })
        } catch (err) {
            console.error(err)
        }
    }

    const changeHandler = (value, controlName) => {
        const formControls = {...state.formControls}
        const control = {...state.formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        setState((prevState) => {
            return {
                ...prevState,
                formControls,
                formIsValid: validateForm(formControls)
            }
        })
        // setState({
        //     formControls,
        //     formIsValid: validateForm(formControls)
        // })
    }


    const renderControls = () => {
        return Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName]
            return (<>
                    <Input
                        key={index}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        toched={control.touched}
                        errorMessage={control.errorMessage}
                        shoudValidate={!!control.validation}
                        onChange={event => changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 && <hr/>}
                </>
            )
        })
    }


    const selectChangeHandlers = (e) => {
        // setState({
        //     rightAnswerId: +e.target.value
        // })
        setState((prevsStatte) => {
            return (
                {
                    ...prevsStatte,
                    rightAnswerId: +e.target.value
                }
            )
        })
        // console.log(e.target.value)
    }

    const select = <Select
        label='Выберите правильный ответ'
        value={state.rightAnswerId}
        onChange={selectChangeHandlers}
        options={[
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4}
        ]}
    />

    return (
        <div className={classes.quizCreator}>
            <div>
                <h1>Создание теста</h1>
                <form onSubmit={submitHandler}>
                    {renderControls()}
                    {select}
                    <Button
                        type='primary'
                        onClick={addQuestionHandler}
                        disabled={!state.formIsValid}
                    >
                        Добавить вопрос
                    </Button>
                    <Button
                        type='success'
                        onClick={createQuizHandler}
                        disabled={state.quiz.length === 0}
                    >
                        Создать тест
                    </Button>
                </form>
            </div>
        </div>

    )
}

export default QuizCreator