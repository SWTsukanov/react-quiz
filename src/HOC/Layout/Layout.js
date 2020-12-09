import React from 'react'

import classes from './layout.module.scss'

class Layout extends React.Component{
    render(){
        return(
            <div className={classes.layout}>
                <main>{this.props.children}</main>
            </div>
        )
    }
}

export default Layout;