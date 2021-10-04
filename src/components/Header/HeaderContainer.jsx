import React from 'react';
import { connect } from 'react-redux';
import { setErrorMessage } from '../../redux/reducers/searchReducer';
import Header from './Header';

const HeaderContainer = (props) => {

    return (
        <Header setErrorMessage={props.setErrorMessage} />
    )

}

export default connect(null, { setErrorMessage })(HeaderContainer)