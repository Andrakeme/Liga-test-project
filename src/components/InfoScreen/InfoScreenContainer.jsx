import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getMoreAnswers, setCurrentQuestionTitle, setSelectedSort, sortData } from '../../redux/reducers/searchReducer';
import Loader from '../Loader/Loader';
import InfoScreen from './InfoScreen'

const InfoScreenContainer = (props) => {

    let [pageNumber, setPageNumber] = useState(2)

    const params = useParams();

    useEffect(() => {
        props.setCurrentQuestionTitle(params.id)
        props.setSelectedSort('Сортировка')
    }, [params.id])

    const getMoreAnswers = () => {
        props.getMoreAnswers(pageNumber, params.id)
        setPageNumber(pageNumber + 1)
    }

    return (
        <div>
            {props.isLoading
                ? <Loader />
                : <InfoScreen
                    data={props.data}
                    currentQuestionTitle={props.currentQuestionTitle}
                    getMoreAnswers={getMoreAnswers}
                    isMoreDataLoading={props.isMoreDataLoading}
                    isMoreAnswers={props.isMoreAnswers}
                    sortData={props.sortData}
                    setSelectedSort={props.setSelectedSort}
                    selectedSort={props.selectedSort} />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.searchData.answersData,
        isLoading: state.searchData.isLoading,
        currentQuestionTitle: state.searchData.currentQuestionTitle,
        isMoreDataLoading: state.searchData.isMoreDataLoading,
        isMoreAnswers: state.searchData.isMoreAnswers,
        selectedSort: state.searchData.selectedSort
    }
}

export default connect(mapStateToProps,
    {
        setCurrentQuestionTitle, getMoreAnswers, setSelectedSort,
        sortData
    })(InfoScreenContainer)