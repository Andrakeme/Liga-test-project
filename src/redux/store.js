import { applyMiddleware, combineReducers, createStore } from "redux";
import { searchReducer } from "./reducers/searchReducer";
import thunk from 'redux-thunk';

const saveState = (state) => {
    const serialisedState = JSON.stringify(state)
    window.localStorage.setItem('app_state', serialisedState)
}

const loadState = () => {
    const serialisedState = window.localStorage.getItem('app_state')
    if (!serialisedState) return undefined
    return JSON.parse(serialisedState)
}

const oldState = loadState()

const rootReducer = combineReducers(
    {
        searchData: searchReducer
    }
)

export const store = createStore(rootReducer, oldState, applyMiddleware(thunk));

store.subscribe(() => {
    saveState(store.getState())
})