import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SearchScreenContainer from '../SearchScreen/SearchScreenContainer'
import ResultScreenContainer from '../ResultSreen/ResultScreenContainer'
import ErrorScreenContainer from '../ErrorScreen/ErrorScreenContainer'
import InfoScreenContainer from '../InfoScreen/InfoScreenContainer';

const MainPage = (props) => {
    return (
        <div>
            <Switch>
                <Route exact path='/search'>
                    <SearchScreenContainer />
                </Route>
                <Route exact path='/result'>
                    <ResultScreenContainer />
                </Route>
                <Route exact path='/info/:id'>
                    <InfoScreenContainer />
                </Route>
                <Route path='/error'>
                    <ErrorScreenContainer />
                </Route>
                <Redirect to='search' />
            </Switch>
            {props.errorMessage
                ? <Switch><Redirect to='/error' /></Switch>
                : ''}
        </div>
    )
}

export default MainPage