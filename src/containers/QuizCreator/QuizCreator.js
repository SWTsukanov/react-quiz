import React, {useState} from 'react'
import classes from './quizCreator.module.scss'
import Button from "../../components/UI/Button/Button";
import {createControl} from "../../Form/formFramework";
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
        rightAnswerId:1,
        formControls: createFormControls()
    })

    const submitHandler = (e) => {
        e.preventDefault()
    }

    const addQuestionHandler = () => {

    }
    const createQuizHandler = () => {

    }

    const changeHandler = (value, controlName) => {

    }


    const renderControls = () => {
        return Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName]
            return (<>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        toched={control.touched}
                        errorMessage={control.errorMessage}
                        shoudValidate={!!control.validate}
                        onChange={event => changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 && <hr/>}
                </>
            )
        })
    }


   const selectChangeHandlers = (e)=>{
        // setState({
        //     rightAnswerId: +e.target.value
        // })
       console.log(e.target.value)
   }

    const select = <Select
        label='Выберите правильный ответ'
        value={state.rightAnswerId}
        onChange = {selectChangeHandlers}
        options={[
            {text:1,value:1},
            {text:2,value:2},
            {text:3,value:3},
            {text:4,value:4}
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
                    >
                        Добавить вопрос
                    </Button>
                    <Button
                        type='success'
                        onClick={createQuizHandler}
                    >
                        Создать тест
                    </Button>
                </form>
            </div>
        </div>

    )
}

export default QuizCreator