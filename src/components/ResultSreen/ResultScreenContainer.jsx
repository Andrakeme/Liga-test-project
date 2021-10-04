import React, { useEffect, useState } from 'react';
import ResultScreen from './ResultScreen';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import {
    getAnswersByQuestionId, getMoreSearchData, getQuestionsByTag,
    getQuestionsByUserId, setSelectedSort, sortData
} from '../../redux/reducers/searchReducer';

const ResultScreenContainer = (props) => {

    useEffect(() => {
        props.setSelectedSort('Сортировка')
    }, [])

    let [isQuickMenuShown, setIsQuickMenuShown] = useState(false);

    let [typeOfQuickMenu, setTypeOfQuickMenu] = useState('');

    let [pageNumber, setPageNumber] = useState(2);

    const getQuestionsByUserId = (id, userName) => {
        setIsQuickMenuShown(true);
        setTypeOfQuickMenu(`от автора ${userName}`)
        props.getQuestionsByUserId(id)
    }

    const getQuestionsByTag = (tag) => {
        setIsQuickMenuShown(true);
        setTypeOfQuickMenu(`по тегу ${tag}`);
        props.getQuestionsByTag(tag)
    }

    const getMoreSearchResults = () => {
        props.getMoreSearchData(pageNumber, props.searchString)
        setPageNumber(pageNumber + 1)
    }

    return (
        <div>
            {props.isLoading ? <Loader />
                : <ResultScreen
                    data={props.data}
                    isQuickMenuShown={isQuickMenuShown}
                    getQuestionsByUserId={getQuestionsByUserId}
                    getQuestionsByTag={getQuestionsByTag}
                    typeOfQuickMenu={typeOfQuickMenu}
                    getAnswersByQuestionId={props.getAnswersByQuestionId}
                    sortData={props.sortData}
                    setSelectedSort={props.setSelectedSort}
                    selectedSort={props.selectedSort}
                    getMoreSearchResults={getMoreSearchResults}
                    isMoreResults={props.isMoreResults}
                    isMoreDataLoading={props.isMoreDataLoading}
                />}
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        data: state.searchData.searchData,
        isLoading: state.searchData.isLoading,
        selectedSort: state.searchData.selectedSort,
        searchString: state.searchData.searchString,
        isMoreResults: state.searchData.isMoreSearchResults,
        isMoreDataLoading: state.searchData.isMoreDataLoading
    }
}

export default connect(mapStateToProps,
    {
        getQuestionsByUserId, getQuestionsByTag, getAnswersByQuestionId,
        sortData, setSelectedSort, getMoreSearchData
    })(ResultScreenContainer)