import React from 'react';
import Loader from '../Loader/Loader';
import QuickViewSreenContainer from '../QuickViewScreen/QuickViewScreenContainer';
import ResultItem from '../ResultItem/ResultItem';
import classes from './ResultScreen.module.css'

const ResultScreen = (props) => {

    const sortResults = (sort) => {
        props.setSelectedSort(sort)
        props.sortData(sort, 'results')
    }

    let resultItems = props.data.map(item => <ResultItem
        key={item.question_id}
        name={item.owner.display_name}
        title={item.title}
        answerCount={item.answer_count}
        tags={item.tags}
        userId={item.owner.user_id}
        questionId={item.question_id}
        getQuestionsByUserId={props.getQuestionsByUserId}
        getQuestionsByTag={props.getQuestionsByTag}
        getAnswersByQuestionId={props.getAnswersByQuestionId}
        class='fullView'
    />)

    return (
        <div className={classes.wrapper}>
            {resultItems.length
                ? <div className={classes.results}>
                    <div className={classes.header}>
                        <span>Результаты поиска</span>
                        <div className={classes.select}>
                            <select value={props.selectedSort}
                                onChange={(event) => sortResults(event.target.value)}>
                                <option disabled>Сортировка</option>
                                <option value='date'>Сначала новые</option>
                                <option value='answersCount'>По количеству ответов</option>
                            </select>
                        </div>
                    </div>
                    <div>{resultItems}</div>
                    {props.isMoreResults
                        ? props.isMoreDataLoading
                            ? <Loader />
                            : <button
                                className={classes.button}
                                onClick={() => props.getMoreSearchResults()}>
                                Показать еще
                            </button>
                        : ''
                    }
                </div>
                : 'По вашему запросу не было найдено результатов'}

            <div className={classes.quickMenu}>
                {props.isQuickMenuShown
                    ? <QuickViewSreenContainer
                        typeOfQuickMenu={props.typeOfQuickMenu}
                        getQuestionsByTag={props.getQuestionsByTag} />
                    : ''}
            </div>
        </div>
    )
}

export default ResultScreen