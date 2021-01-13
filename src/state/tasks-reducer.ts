import { RemoveTodolistType, AddTodolistType, SetTodolistType } from './todolist-reducer';
import { TaskStateType } from './../App';
import {TaskType} from '../Todolist'
import { TaskPriorities, TaskStatuses,todolistsAPI, UpdateTaskModelType } from './../API/todolist-api';
import { Action, Dispatch } from 'redux';
import {RootStateType} from '../state/store'

type RemoveTaskType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}

type AddTaskType = {
    type: 'ADD-TASK'
    task:any
}

type ChangeStatusType = {
    type: 'CHANGE-STATUS'
    taskId: string
    model:any
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
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }  
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
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
            return({...state, [action.todolist.id]: []})
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

export const addTaskAC = (task:TaskType):AddTaskType => ({type:'ADD-TASK',
    task
})

export const changeStatusAC = (taskId: string, model:any, todolistId:string):ChangeStatusType => ({
    type: 'CHANGE-STATUS', taskId, model, todolistId
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

export const removeTaskTC = (id:string, todolistId:string) => {
    return (dispatch:Dispatch) => {
        todolistsAPI.deleteTask(todolistId, id)
        .then(response => {
           dispatch(removeTaskAC(id, todolistId)) 
        })     
    }
}

export const addTaskTC = (title:string, todolistId:string) => {
    return (dispatch:Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
        .then((response) => {
            dispatch(addTaskAC(response.data.data.item))
        })
    }
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch:Dispatch, getState: () => any) => {
        const state = getState()
        const task = state.tasks[todolistId].find((t:any) => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: any = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                const action = changeStatusAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
    }}

    export type UpdateDomainTaskModelType = {
        title?: string
        description?: string
        status?: TaskStatuses
        priority?: TaskPriorities
        startDate?: string
        deadline?: string
    }