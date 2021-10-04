import React from 'react';
import classes from './AnswerItem.module.css'

const AnswerItem = (props) => {

    return (
        <div className={classes.wrapper}>
            <div className={classes.name}>
                Автор: <span>{props.name}</span>
            </div>
            <div className={classes.link}>
                <a target='_blank' rel="noreferrer"
                    href={`https://stackoverflow.com/questions/${props.questionId}/${props.answerId}#${props.answerId}`}>
                    Ссылка на ответ
                </a>
            </div>
        </div>
    )
}

export default AnswerItem