import React from 'react'
import classes from './layout.module.scss'

import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends React.Component {
    state = {
        menu: false

    }
    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    render() {
        return (
            <div className={classes.layout}>
                {/*{this.state.menu && <Drawer isOpen={this.state.menu}/>}*/}
                <Drawer isOpen={this.state.menu} onClose={this.toggleMenuHandler}/>
                <MenuToggle
                    isOpen={this.state.menu}
                    onToggle={this.toggleMenuHandler}
                />


                <main>{this.props.children}</main>
            </div>
        )
    }
}

export default Layout;