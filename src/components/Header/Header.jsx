import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css'

const Header = (props) => {
    return (
        <div className={classes.header}>
            <NavLink to='/search'
                onClick={() => props.setErrorMessage('')} >Поисковое приложение stackoverflow</NavLink>
        </div>
    )
}

export default Header