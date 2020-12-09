import React from 'react'
import classes from './button.module.scss'

const Button = (props) => {
    const cls = [
        classes.button,
        classes[props.type]
    ]
return(
    <button
        onClick={props.onClick}
        disabled={props.disabled}
        className={cls.join(' ')}
    >
        {props.children}
    </button>
)
}

export default Button