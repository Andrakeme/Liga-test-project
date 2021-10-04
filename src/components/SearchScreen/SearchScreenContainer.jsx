import React from 'react';
import { connect } from 'react-redux';
import { getSearchData, setSearchString } from '../../redux/reducers/searchReducer';
import SearchScreen from './SearchScreen'

const SearchScreenContainer = (props) => {

    return (
        <SearchScreen
            getSearchData={props.getSearchData}
            isLoading={props.isLoading}
            setSearchString={props.setSearchString}
        />
    )

}

const mapStateToProps = (state) => {
    return {
        isLoading: state.searchData.isLoading
    }
}

export default connect(mapStateToProps,
    { getSearchData, setSearchString })(SearchScreenContainer)