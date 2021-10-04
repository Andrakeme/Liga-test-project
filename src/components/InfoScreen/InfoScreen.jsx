import React from 'react'
import AnswerItem from '../AnswerItem/AnswerItem'
import Loader from '../Loader/Loader'
import classes from './InfoScreen.module.css'

const InfoScreen = (props) => {

    const sortAnswers = (sort) => {
        props.setSelectedSort(sort)
        props.sortData(sort, 'answers')
    }

    const answerItems = props.data.map(item => <AnswerItem
        key={item.answer_id}
        name={item.owner.display_name}
        currentQuestionTitle={props.currentQuestionTitle}
        questionId={item.question_id}
        answerId={item.answer_id} />)

    return (
        <div className={classes.wrapper}>
            <span className={classes.title}>{props.currentQuestionTitle}</span>
            {props.data.length
                ? <div className={classes.select}>
                    <select
                        value={props.selectedSort}
                        onChange={(event) => sortAnswers(event.target.value)}>
                        <option disabled>Сортировка</option>
                        <option value="date">Сначала новые</option>
                        <option value='rate'>По рейтингу</option>
                    </select>
                </div>
                : ''
            }

            <div className={classes.answers}>
                {props.data.length ? answerItems : 'На этот вопрос пока нет ответов'}
            </div>
            {props.isMoreAnswers
                ? props.isMoreDataLoading
                    ? <Loader />
                    : <button className={classes.button}
                        onClick={() => props.getMoreAnswers()}>Показать еще</button>
                : ''
            }
        </div>
    )
}

export default InfoScreen