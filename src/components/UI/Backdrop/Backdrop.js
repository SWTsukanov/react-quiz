import React from 'react'
import classes from './Backdrop.module.scss'

const Backdrop = (props) =>{
    return(
            <div className={classes.backdrop} onClick={props.onClose}/>
        )

}

export default Backdrop