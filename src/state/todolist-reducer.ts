import { setError, setStatus } from './app-reducer';
import { todolistsAPI } from './../API/todolist-api';
import { TodolistType, FilterValuesType } from './../App';
import { v1 } from 'uuid';
import { Dispatch } from 'redux';

export type RemoveTodolistType = {
   type: 'REMOVE-TODOLIST'
   todolistId: string
}

export type AddTodolistType = {
   type: 'ADD-TODOLIST'
   todolist: any
}

type ChangeTodolistType = {
   type: 'ONCHANGE-TODOLIST'
   title: string
   todolistId: string
}

type ChangeFilterType = {
   type: 'CHANGE-FILTER'
   filter: FilterValuesType
   todolistId: string
}

export type SetTodolistType = {
   type: 'SET-TODOLISTS'
   todolists: Array<any>
}

export type ChangeEntityStatusType = {
   type: 'CHANGE-ENTITY-STATUS'
   todolistId: string
   entityStatus: string
}

export let todolistId1 = v1()
export let todolistId2 = v1() 

const initialState:Array<TodolistType> = []

type ActionType = RemoveTodolistType | AddTodolistType | ChangeTodolistType | ChangeFilterType | SetTodolistType | ChangeEntityStatusType

 export const todolistsReducer = (state:Array<TodolistType> = initialState, action: ActionType):Array<TodolistType> => {
    switch (action.type) {
         case 'REMOVE-TODOLIST':          
            return([...state.filter(todo => todo.id !== action.todolistId)]) 
         case 'ADD-TODOLIST':
            const newTodolist = {...action.todolist, filter: 'all', entityStatus: 'idle'}
           return [newTodolist, ...state] 
         case 'ONCHANGE-TODOLIST': {
            let todolist = state.find(todo => todo.id === action.todolistId)
            if(todolist)todolist.title = action.title
            return([...state]) }
         case 'CHANGE-FILTER': {
            let todolist = state.find(todo => todo.id === action.todolistId)
            if(todolist)todolist.filter = action.filter
            return([...state])}  
         case 'CHANGE-ENTITY-STATUS': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.entityStatus} : tl)
         }
         case 'SET-TODOLISTS':{
               return action.todolists.map(tl => {
                  return { ...tl, filter: 'all', entityStatus: 'idle'}
               })} 
        default:
            return state
    }
 }

 export const removeTodolistAC = (todolistId:string):RemoveTodolistType => ({
    type: 'REMOVE-TODOLIST', todolistId
 })
 
 export const addTodolistAC = (todolist:any):AddTodolistType => ({type: 'ADD-TODOLIST', todolist})

 export const onChangeTodolistAC = (title:string, todolistId:string):ChangeTodolistType => ({
    type: 'ONCHANGE-TODOLIST', title, todolistId
 })

 export const changeFilterAC = (filter:FilterValuesType, todolistId:string):ChangeFilterType =>({
    type: 'CHANGE-FILTER', filter, todolistId
 })

 export const setTodolistAC = (todolists: Array<TodolistType>):SetTodolistType =>({
   type: 'SET-TODOLISTS', todolists
})

export const changeTodolistEntityStatus = (todolistId:string, entityStatus:string):ChangeEntityStatusType =>({
   type: 'CHANGE-ENTITY-STATUS', todolistId, entityStatus
})


export const fetchTodolistThunkTC = () => {
   return (dispatch:Dispatch) => {
      dispatch(setStatus('loading')) 
   todolistsAPI.getTodos()
   .then((response) => {
      dispatch(setTodolistAC(response.data))
      dispatch(setStatus('succeeded')) 
   })
}
}

export const removeTodolistTC = (todoId:string) => {
   return (dispatch:Dispatch) => {
      dispatch(setStatus('loading')) 
      dispatch(changeTodolistEntityStatus(todoId, 'loading'))
   todolistsAPI.deleteTodos(todoId)
   .then((response) => {
      dispatch(removeTodolistAC(todoId))
      dispatch(setStatus('succeeded')) 
   })
}
}

export const onChangeTodolist = (todoId:string) => {
   return (dispatch:Dispatch) => {
      dispatch(setStatus('loading')) 
   todolistsAPI.createTodos(todoId)
   .then((response) => {
      dispatch(addTodolistAC(response.data.data.item))
      dispatch(setStatus('succeeded')) 
   })
}
}

export const addTodolistTC = (todoId:string) => {
   return (dispatch:Dispatch) => {
      dispatch(setStatus('loading')) 
   todolistsAPI.createTodos(todoId)
   .then((response) => {
      if(response.data.resultCode === 0){
      dispatch(addTodolistAC(response.data.data.item))
      dispatch(setStatus('succeeded'))         
      }
      else{
         if(response.data.messages.length){
            dispatch(setError(response.data.messages[0]))
        }else {
            dispatch(setError('Some error exist'))
        }
        dispatch(setStatus('failed')) 
      }
   })
}
}

export const onChangeTodolistTC = (title:string, todolistId:string) => {
   return (dispatch:Dispatch) => {
      dispatch(setStatus('loading')) 
   todolistsAPI.upDataTodos(todolistId, title)
   .then((response) => {
      dispatch(onChangeTodolistAC(title, todolistId))
      dispatch(setStatus('succeeded'))
   })
}
}

