import React from 'react'
import classes from './loader.module.css'

const Loader = (props)=>{
    return(
        <div className={classes.center}>
            <div className={classes.loader}>
                <div/>
                <div/>
            </div>
        </div>

        )
}

export default Loader
