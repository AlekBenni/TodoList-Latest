import { RemoveTodolistType, AddTodolistType, SetTodolistType } from './todolist-reducer';
import { TaskStateType } from './../App';
import {TaskType} from '../Todolist'
import { todolistsAPI } from './../API/todolist-api';
import { v1 } from 'uuid';
import { Dispatch } from 'redux';

type RemoveTaskType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}

type AddTaskType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type ChangeStatusType = {
    type: 'CHANGE-STATUS'
    taskId: string
    isDone:boolean
    todolistId: string
}

type ChangeTitleType = {
    type: 'CHANGE-TITLE'
    title: string
    id: string
    todolistId: string
}

export type SetTasksType = {
    type: 'SET-TASKS'
    tasks: any
    todolistId: string
}

type ActionsType = RemoveTaskType | AddTaskType | ChangeStatusType | ChangeTitleType | RemoveTodolistType | AddTodolistType | SetTodolistType | SetTasksType

const initialState:TaskStateType = {}

export const tasksReducer = (state:TaskStateType = initialState, action: ActionsType):TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let tasks = state[action.todolistId]
            let filteredtasks = tasks.filter(task => task.id !== action.id)
            state[action.todolistId] = filteredtasks
            return({...state}) 
        case 'ADD-TASK':{
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const tasks = stateCopy[action.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }  
        case 'CHANGE-STATUS': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, isDone: action.isDone}
                    : t);
            return ({...state});
        }  
        case 'CHANGE-TITLE': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.id
                    ? {...t, title: action.title}
                    : t);
            return ({...state});
        }    
        case 'REMOVE-TODOLIST': 
            delete state[action.todolistId]
            return({...state})   
        case 'ADD-TODOLIST':  
            return({...state, [action.newTodoId]: []})
        case 'SET-TODOLISTS': 
            let stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        case 'SET-TASKS':{
            let stateCopy = {...state}  
            stateCopy[action.todolistId] = action.tasks
            return stateCopy 
        }
    default:
        return state
    }
}

export const removeTaskAC = (id:string, todolistId:string):RemoveTaskType => ({
    type: 'REMOVE-TASK', id, todolistId
})

export const addTaskAC = (title:string, todolistId:string):AddTaskType => ({type:'ADD-TASK',
    title, todolistId
})

export const changeStatusAC = (taskId: string, isDone:boolean, todolistId:string):ChangeStatusType => ({
    type: 'CHANGE-STATUS', taskId, isDone, todolistId
})

export const onChangeTitleAC = (title:string, id: string, todolistId:string):ChangeTitleType =>({
    type: 'CHANGE-TITLE', title, id, todolistId
})

export const SetTasksAC = ( tasks: any, todolistId: string):SetTasksType => ({
    type: 'SET-TASKS', tasks, todolistId
})

export const fetchTasksThunkTC = (todolistId:string) => {
    return (dispatch:Dispatch) => {
        todolistsAPI.getTasks(todolistId)
        .then((response) => {
            dispatch(SetTasksAC(response.data.items, todolistId))
        })
    }
}