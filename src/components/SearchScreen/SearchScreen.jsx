import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './SearchScreen.module.css'

const SearchScreen = (props) => {

    let [searchText, setSearchText] = useState('')

    const setSearchString = (e) => {
        setSearchText(e.target.value)
    }

    const submitSearch = () => {
        props.getSearchData(searchText)
        props.setSearchString(searchText)
    }

    return (
        <div className={classes.wrapper}>
            <input className={classes.input} placeholder='Введите поисковый запрос'
                type="text"
                value={searchText}
                onChange={setSearchString}
            />
            <NavLink to='/result' className={classes.button} >
                <button disabled={!searchText} onClick={submitSearch}>Искать</button>
            </NavLink>
        </div>
    )
}

export default SearchScreen