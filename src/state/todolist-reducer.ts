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
   title: string
   newTodoId: string
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

export let todolistId1 = v1()
export let todolistId2 = v1() 

const initialState:Array<TodolistType> = []

type ActionType = RemoveTodolistType | AddTodolistType | ChangeTodolistType | ChangeFilterType | SetTodolistType

 export const todolistsReducer = (state:Array<TodolistType> = initialState, action: ActionType):Array<TodolistType> => {
    switch (action.type) {
         case 'REMOVE-TODOLIST':          
            return([...state.filter(todo => todo.id !== action.todolistId)]) 
         case 'ADD-TODOLIST':
            let todolist:TodolistType = {
               id: action.newTodoId,
               title: action.title,
               filter: "all"
           }
           return([todolist, ...state])
         case 'ONCHANGE-TODOLIST': {
            let todolist = state.find(todo => todo.id === action.todolistId)
            if(todolist)todolist.title = action.title
            return([...state]) }
         case 'CHANGE-FILTER': {
            let todolist = state.find(todo => todo.id === action.todolistId)
            if(todolist)todolist.filter = action.filter
            return([...state])}  
            case 'SET-TODOLISTS':{
               return action.todolists.map(tl => {
                  return { ...tl, filter: 'all' }
               })} 
        default:
            return state
    }
 }

 export const removeTodolistAC = (todolistId:string):RemoveTodolistType => ({
    type: 'REMOVE-TODOLIST', todolistId
 })
 
 export const addTodolistAC = (title:string):AddTodolistType => ({type: 'ADD-TODOLIST', title,
 newTodoId: v1()
 })

 export const onChangeTodolistAC = (title:string, todolistId:string):ChangeTodolistType => ({
    type: 'ONCHANGE-TODOLIST', title, todolistId
 })

 export const changeFilterAC = (filter:FilterValuesType, todolistId:string):ChangeFilterType =>({
    type: 'CHANGE-FILTER', filter, todolistId
 })

 export const setTodolistAC = (todolists: Array<TodolistType>):SetTodolistType =>({
   type: 'SET-TODOLISTS', todolists
})

export const fetchTodolistThunkTC = () => {
   return (dispatch:Dispatch) => {
   todolistsAPI.getTodos()
   .then((response) => {
      dispatch(setTodolistAC(response.data))
   })
}
}


