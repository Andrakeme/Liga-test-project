import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAnswersByQuestionId, getQuestionsByUserId } from '../../redux/reducers/searchReducer';
import Loader from '../Loader/Loader';
import QuickViewSreen from './QuickViewScreen';

const QuickViewSreenContainer = (props) => {

    let [typeOfQuickMenu, setTypeOfQuickMenu] = useState(props.typeOfQuickMenu);

    useEffect(() => {
        setTypeOfQuickMenu(props.typeOfQuickMenu)
    }, [props.typeOfQuickMenu])

    const getQuestionsByUserId = (id, userName) => {
        setTypeOfQuickMenu(`от автора ${userName}`)
        props.getQuestionsByUserId(id)
    }

    const getQuestionsByTag = (tag) => {
        setTypeOfQuickMenu(`по тегу ${tag}`);
        props.getQuestionsByTag(tag)
    }

    return (
        <div>
            {props.isLoading
                ? <Loader />
                : <QuickViewSreen
                    data={props.data}
                    typeOfQuickMenu={typeOfQuickMenu}
                    getQuestionsByTag={getQuestionsByTag}
                    getAnswersByQuestionId={props.getAnswersByQuestionId}
                    getQuestionsByUserId={getQuestionsByUserId}
                />
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.searchData.quickMenuData,
        isLoading: state.searchData.isQuickMenuLoading
    }
}

export default connect(mapStateToProps,
    { getAnswersByQuestionId, getQuestionsByUserId })(QuickViewSreenContainer)