import { searchAPI } from "../../api/api"

//action types
const SET_SEARCH_DATA = 'SET_SEARCH_DATA'
const SET_MORE_SEARCH_DATA = 'SET_MORE_SEARCH_DATA'
const SET_IS_LOADING = 'SET_IS_LOADING'
const SET_QUICK_MENU_DATA = 'SET_QUICK_MENU_DATA'
const SET_IS_QUICK_MENU_LOADING = 'SET_IS_QUICK_MENU_LOADING'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
const SET_ANSWERS_DATA = 'SET_ANSWERS_DATA'
const SET_CURRENT_QUESTION_TITLE = 'SET_CURRENT_QUESTION_TITLE'
const SET_SEARCH_STRING = 'SET_SEARCH_STRING'
const SET_SELECTED_SORT = 'SET_SELECTED_SORT'
const SORT_DATA = 'SORT_DATA'
const SET_IS_MORE_DATA = 'SET_IS_MORE_DATA'
const SET_IS_MORE_ANSWERS = 'SET_IS_MORE_ANSWERS'
const SET_IS_MORE_DATA_LOADING = 'SET_IS_MORE_DATA_LOADING'
const SET_MORE_ANSWERS = 'SET_MORE_ANSWERS'

//action creators
export const setSearchData = (data) => ({ type: SET_SEARCH_DATA, data })

export const setIsLoading = (isLoading) => ({ type: SET_IS_LOADING, isLoading })

export const setQuickMenuData = (data) => ({ type: SET_QUICK_MENU_DATA, data })

export const setIsQuickMenuLoading = (isLoading) => ({ type: SET_IS_QUICK_MENU_LOADING, isLoading })

export const setErrorMessage = (message) => ({ type: SET_ERROR_MESSAGE, message })

export const setAnswersData = (data) => ({ type: SET_ANSWERS_DATA, data })

export const setCurrentQuestionTitle = (id) => ({ type: SET_CURRENT_QUESTION_TITLE, id })

export const setSelectedSort = (selectedSort) => ({ type: SET_SELECTED_SORT, selectedSort })

export const sortData = (sort, caller) => ({ type: SORT_DATA, sort, caller })

export const setMoreSearchData = (data) => ({ type: SET_MORE_SEARCH_DATA, data })

export const setMoreDataLoading = (isLoading) => ({ type: SET_IS_MORE_DATA_LOADING, isLoading })

export const setSearchString = (text) => ({ type: SET_SEARCH_STRING, text })

export const setIsMoreData = (isMoreData) => ({ type: SET_IS_MORE_DATA, isMoreData })

export const setIsMoreAnswers = (isMoreAnswers) => ({ type: SET_IS_MORE_ANSWERS, isMoreAnswers })

export const setMoreAnswers = (data) => ({ type: SET_MORE_ANSWERS, data })

//thunk creators
export const getSearchData = (text) => {

    return dispatch => {
        dispatch(setIsLoading(true))
        searchAPI.getData(text)
            .then(Response => {
                dispatch(setSearchData(Response.data.items))
                dispatch(setIsMoreData(Response.data.has_more))
                dispatch(setIsLoading(false))
            },
                Error => {
                    dispatch(setErrorMessage(Error.message))
                    dispatch(setIsLoading(false))
                })
    }

}

export const getMoreSearchData = (page, text) => {

    return dispatch => {
        dispatch(setMoreDataLoading(true))
        searchAPI.getMoreSearchResults(page, text)
            .then(Response => {
                dispatch(setMoreSearchData(Response.data.items))
                dispatch(setIsMoreData(Response.data.has_more))
                dispatch(setMoreDataLoading(false))
            },
                Error => {
                    dispatch(setErrorMessage(Error.message))
                    dispatch(setMoreDataLoading(false))
                })
    }
}

export const getQuestionsByUserId = (id) => {

    return dispatch => {
        dispatch(setIsQuickMenuLoading(true))
        searchAPI.getQuestionsByUserId(id)
            .then(Response => {
                dispatch(setQuickMenuData(Response))
                dispatch(setIsQuickMenuLoading(false))
            },
                Error => {
                    dispatch(setErrorMessage(Error.message))
                    dispatch(setIsLoading(false))
                }
            )
    }
}

export const getQuestionsByTag = (tag) => {

    return dispatch => {
        dispatch(setIsQuickMenuLoading(true))
        searchAPI.getQuestionsByTag(tag)
            .then(Response => {
                dispatch(setQuickMenuData(Response))
                dispatch(setIsQuickMenuLoading(false))
            },
                Error => {
                    dispatch(setErrorMessage(Error.message))
                    dispatch(setIsLoading(false))
                }
            )

    }
}

export const getAnswersByQuestionId = (id) => {

    return dispatch => {
        dispatch(setIsLoading(true))
        searchAPI.getAnswersByQuestionId(id)
            .then(Response => {
                dispatch(setAnswersData(Response.items))
                dispatch(setIsMoreAnswers(Response.has_more))
                dispatch(setIsLoading(false))
            },
                Error => {
                    dispatch(setErrorMessage(Error.message))
                    dispatch(setIsLoading(false))
                })
    }
}

export const getMoreAnswers = (page, id) => {

    return dispatch => {
        dispatch(setMoreDataLoading(true))
        searchAPI.getMoreAnswers(page, id)
            .then(Response => {
                dispatch(setMoreAnswers(Response.items))
                dispatch(setIsMoreAnswers(Response.has_more))
                dispatch(setMoreDataLoading(false))
            },
                Error => {
                    dispatch(setErrorMessage(Error.message))
                    dispatch(setMoreDataLoading(false))
                })
    }
}

//----------------------------------------------------------------------------------//

const initialState = {
    searchData: [],
    isLoading: false,
    quickMenuData: [],
    isQuickMenuLoading: false,
    errorMessage: '',
    answersData: [],
    currentQuestionTitle: '',
    selectedSort: 'Сортировка',
    searchString: '',
    isMoreSearchResults: false,
    isMoreAnswers: false,
    isMoreDataLoading: false
}


export const searchReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_SEARCH_DATA:
            return {
                ...state,
                searchData: action.data
            }

        case SET_SEARCH_STRING:
            return {
                ...state,
                searchString: action.text
            }

        case SET_MORE_SEARCH_DATA:
            let searchData = [...state.searchData, ...action.data]
            switch (state.selectedSort) {
                case 'date':
                    searchData.sort((a, b) => {
                        return b.creation_date - a.creation_date
                    })
                    break

                case 'answersCount':
                    searchData.sort((a, b) => {
                        return b.answer_count - a.answer_count
                    })
                    break

                default: break
            }
            return {
                ...state,
                searchData: searchData
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }

        case SET_IS_MORE_DATA_LOADING:
            return {
                ...state,
                isMoreDataLoading: action.isLoading
            }

        case SET_IS_MORE_DATA:
            return {
                ...state,
                isMoreSearchResults: action.isMoreData
            }

        case SET_QUICK_MENU_DATA:
            return {
                ...state,
                quickMenuData: action.data
            }

        case SET_IS_QUICK_MENU_LOADING:
            return {
                ...state,
                isQuickMenuLoading: action.isLoading
            }

        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.message
            }

        case SET_ANSWERS_DATA:
            return {
                ...state,
                answersData: action.data
            }

        case SET_IS_MORE_ANSWERS:
            return {
                ...state,
                isMoreAnswers: action.isMoreAnswers
            }

        case SET_MORE_ANSWERS:
            let answersData = [...state.answersData, ...action.data]
            switch (state.selectedSort) {
                case 'date':
                    answersData.sort((a, b) => {
                        return b.creation_date - a.creation_date
                    })
                    break

                case 'rate':
                    answersData.sort((a, b) => {
                        return b.score - a.score
                    })
                    break

                default: break
            }
            return {
                ...state,
                answersData: answersData
            }

        case SET_CURRENT_QUESTION_TITLE:
            let currentQuestionTitle =
                (state.searchData.filter(item => item.question_id == action.id)[0]?.title)
                || (state.quickMenuData.filter(item => item.question_id == action.id)[0]?.title)
            return {
                ...state,
                currentQuestionTitle: currentQuestionTitle
            }

        case SET_SELECTED_SORT:
            return {
                ...state,
                selectedSort: action.selectedSort
            }

        case SORT_DATA:
            let sortedData = []
            switch (action.caller) {
                case 'results':
                    sortedData = [...state.searchData]
                    break

                case 'answers':
                    sortedData = [...state.answersData]
                    break

                default: break
            }

            switch (action.sort) {
                case 'date':
                    sortedData.sort((a, b) => {
                        return b.creation_date - a.creation_date
                    })
                    break

                case 'answersCount':
                    sortedData.sort((a, b) => {
                        return b.answer_count - a.answer_count
                    })
                    break
                case 'rate':
                    sortedData.sort((a, b) => {
                        return b.score - a.score
                    })
                    break

                default: return sortedData
            }
            switch (action.caller) {
                case 'results':
                    return {
                        ...state,
                        searchData: sortedData
                    }

                case 'answers':
                    return {
                        ...state,
                        answersData: sortedData
                    }

                default: break
            }
            break

        default: return state
    }
}