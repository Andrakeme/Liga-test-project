import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './ResultItem.module.css'

const ResultItem = (props) => {

    return (
        <div className={`${classes[props.class]} ${classes.wrapper}`}>

            <div className={classes.name}>
                Автор: <span onClick={() => props.getQuestionsByUserId(props.userId, props.name)}>
                    {props.name}
                </span>
            </div>

            <div onClick={() => props.getAnswersByQuestionId(props.questionId)}
                className={classes.topic}>
                <NavLink to={`/info/${props.questionId}`}>{props.title}</NavLink>
            </div>

            <div className={classes.answerCount}>
                Количество ответов: <span>
                    <NavLink
                        to={`/info/${props.questionId}`}
                        onClick={() => props.getAnswersByQuestionId(props.questionId)}>
                        {props.answerCount}
                    </NavLink>
                </span>
            </div>

            <div className={classes.tags}>
                Теги: {props.tags.map(tag => <span onClick={() => props.getQuestionsByTag(tag)}
                    key={tag}>
                    {`${tag} `}</span>)}
            </div>
        </div>
    )
}

export default ResultItem