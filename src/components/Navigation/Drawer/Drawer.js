import React from 'react'
import classes from './Drawer.module.scss'
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [1, 2, 3]

const Drawer = (props) => {
    const cls = [classes.drawer]

    if (!props.isOpen) {
        cls.push(classes.close)
    }
    const renderLinks = (links) => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a href="#">
                        Link {link}
                    </a>
                </li>
            )
        })
    }

    return (
        <>
            <nav className={cls.join(' ')}>
                <ul>
                    {renderLinks(links)}
                </ul>
            </nav>
            {props.isOpen && <Backdrop onClose={props.onClose}/>}
        </>
    )
}

export default Drawer