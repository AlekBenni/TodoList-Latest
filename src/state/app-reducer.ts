import { setLogin } from './../Login/login-reducer';
import { authApi } from './../API/todolist-api';
import { Dispatch } from 'redux';

type InitialStateType = {
    status: RequestStatusType
    error: null | string
    isAuth: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState:InitialStateType = {
    status: 'idle',
    error: null,
    isAuth: false
}

export const appReducer = (state:any = initialState, action: AppActionsType):InitialStateType => {
    switch(action.type){
        case 'SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'SET-ERROR' : {
            return {...state, error: action.error}
        }
        case 'SET-IS-AUTH' : {
            return {...state, isAuth : action.status}
        }
    default:
        return state        
    }
}

type SetErrorType = {
    type: 'SET-ERROR'
    error: string | null
}

type SetStatusType = {
    type: 'SET-STATUS'
    status:RequestStatusType
}

type SetIsAuthType = {
    type: 'SET-IS-AUTH'
    status: boolean
}


export type AppActionsType = SetErrorType | SetStatusType | SetIsAuthType

export const setError = (error:string | null):SetErrorType => ({type: 'SET-ERROR', error})
export const setStatus = (status:RequestStatusType):SetStatusType => ({type: 'SET-STATUS', status})
export const setIsAuth = (status:boolean):SetIsAuthType => ({type: 'SET-IS-AUTH', status})

export const initAppTC = () => (dispatch: Dispatch) => {
    authApi.me()
    .then((response) => {
        if(response.data.resultCode === 0){
            dispatch(setLogin(true))         
        }else{

        }
        dispatch(setIsAuth(true))  
    })
}