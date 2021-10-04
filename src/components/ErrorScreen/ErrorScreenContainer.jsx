import React from 'react';
import ErrorScreen from './ErrorScreen';
import { connect } from 'react-redux';

const ErrorScreenContainer = (props) => {

    return (
        <div>
            <ErrorScreen errorMessage={props.errorMessage} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.searchData.errorMessage
    }
}

export default connect(mapStateToProps, null)(ErrorScreenContainer)