import React from 'react'
import classes from './input.module.scss'



const Input = (props) =>{
    const inputType = props.type || 'text'
    const cls = [classes.input]
    const htmlFor = `${inputType}_${Math.random()}`

    const isInvalid = ({valid, toched, shoudValidate})=>{
        return !valid && toched && shoudValidate
    }

    if(isInvalid(props)){
        cls.push(classes.invalid)
    }


    return(
        <div  className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                value = {props.value}
                onChange={props.onChange}
                id={htmlFor}
            />
            {isInvalid(props) && <span>{props.errorMessage}</span>}

        </div>
    )
}

export default Input