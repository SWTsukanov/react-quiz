import React from 'react'
import classes from './Drawer.module.scss'
import {NavLink} from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [
    {
        to: '/', label: 'Список тестов', exact: true
    },
    {
        to: '/auth', label: 'Авторизация', exact: false
    },
    {
        to: '/quiz-creator', label: 'Создать тест', exact: false
    }
]
// 1, 2, 3]

const Drawer = (props) => {
    const cls = [classes.drawer]

    if (!props.isOpen) {
        cls.push(classes.close)
    }
    const renderLinks = (links) => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={props.onClose}
                    >
                        {link.label}
                    </NavLink>
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