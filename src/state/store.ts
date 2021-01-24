import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolist-reducer';
import { appReducer } from './app-reducer'
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk'

const RootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export type RootStateType = ReturnType<typeof RootReducer>

export const store = createStore(RootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store