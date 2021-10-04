import React from 'react';
import { connect } from 'react-redux';
import MainPage from './MainPage';

const MainPageContainer = (props) => {

    return (
        <MainPage errorMessage={props.errorMessage} />
    )

}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.searchData.errorMessage
    }
}

export default connect(mapStateToProps, null)(MainPageContainer)