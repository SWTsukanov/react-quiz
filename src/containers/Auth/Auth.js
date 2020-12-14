import React, {useState} from 'react'
import classes from './auth.module.scss'
import is from 'is_js'
import axios from 'axios'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";


const Auth = (props) => {
    const [state, setState] = useState(
        {
            isFormValid: false,
            formControls: {
                email: {
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'Введите корректный email',
                    valid: false,
                    toched: false,
                    validation: {
                        reuired: true,
                        email: true
                    }
                },
                password: {
                    value: '',
                    type: 'password',
                    label: 'Пароль',
                    errorMessage: 'Введите корректный пароль',
                    valid: false,
                    toched: false,
                    validation: {
                        reuired: true,
                        minLength: 6
                    }
                }
            }
        }
    )

    const loginHandler = async () => {
        const authData = {
            email: state.formControls.email.value,
            password: state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQdMm48ribjNWCkIyl3HgsJo7lxCdh3r4',authData)
            console.log(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const registerHandler = async () => {
        const authData = {
            email: state.formControls.email.value,
            password: state.formControls.password.value,
            returnSecureToken: true
        }
        console.log(state.formControls.email.value)
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQdMm48ribjNWCkIyl3HgsJo7lxCdh3r4',authData)
            console.log(response.data)
        } catch (e) {
            console.error(e)
        }
    }


    const submitHandler = (e) => {
        e.preventDefault()
    }

    const validateControl = (value, validation) => {
        if (!validation) {
            return true;
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= 6 && isValid
        }

        return isValid
    }

    const onChangeHandler = (event, controlName) => {
        const formControls = {...state.formControls}
        const control = {...state.formControls[controlName]}

        control.value = event.target.value
        control.toched = true
        control.valid = validateControl(control.value, control.validation)
        formControls[controlName] = control;

        let isFormValid = true
        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid
        })

        setState({
            isFormValid,
            formControls
        })
    }

    const renderInputs = () => {
        return Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    toched={control.toched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shoudValidate={!!control.validation}
                    onChange={event => onChangeHandler(event, controlName)}
                >
                </Input>
            )
        })
    }


    return (
        <div className={classes.auth}>
            <div>
                <h1>Авторизация</h1>
                <form className={classes.authForm} onSubmit={submitHandler}>
                    {renderInputs()}
                    <Button type="success" disabled={!state.isFormValid} onClick={loginHandler}>Войти</Button>
                    <Button type="primary" disabled={!state.isFormValid}
                            onClick={registerHandler}>Зарегистрироваться</Button>
                </form>
            </div>

        </div>
    )
}

export default Auth