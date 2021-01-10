import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolist-reducer';
import { combineReducers, createStore } from "redux";

const RootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type RootStateType = ReturnType<typeof RootReducer>

export const store = createStore(RootReducer)

// @ts-ignore
window.store = store