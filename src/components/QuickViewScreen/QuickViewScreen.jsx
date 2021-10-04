import React from 'react';
import ResultItem from '../ResultItem/ResultItem';
import classes from './QuickViewScreen.module.css'

const QuickViewSreen = (props) => {

    const resultItems = props.data.map(item => <ResultItem
        key={item.question_id}
        name={item.owner.display_name}
        userId={item.owner.user_id}
        title={item.title}
        answerCount={item.answer_count}
        tags={item.tags}
        questionId={item.question_id}
        getQuestionsByTag={props.getQuestionsByTag}
        getAnswersByQuestionId={props.getAnswersByQuestionId}
        getQuestionsByUserId={props.getQuestionsByUserId}
        class='quickView'
    />)

    return (
        <div>
            <header className={classes.header}>
                Наиболее популярные вопросы <span className={classes.type}>{props.typeOfQuickMenu}</span>
            </header>
            <main>
                {resultItems}
            </main>
        </div>
    )
}

export default QuickViewSreen