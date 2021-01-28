import { authApi, LoginParamType } from './../API/todolist-api';
import { Action, Dispatch } from 'redux';
import { setError, setStatus } from '../state/app-reducer';
import { hendleAppError, hendleNetworkError } from './../utils/error-utils';

type ActionsType = ReturnType <typeof setLogin>

const initialState:InitialStateType = {
    isLoginIn: false
}

type InitialStateType = {
    isLoginIn:boolean
}

export const loginReducer = (state:InitialStateType = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case 'SET-LOGIN' :
            return {...state, isLoginIn : action.value}
    default:
        return state
    }
}

export const setLogin = ( value: boolean ) => ({
    type: 'SET-LOGIN', value
})

export const loginTC = (data:LoginParamType) => {   
    return (dispatch:Dispatch) => {
        dispatch(setStatus('loading')) 
        authApi.login(data)
        .then((response) => {
            if(response.data.resultCode === 0){
                dispatch(setLogin(true))
                dispatch(setStatus('succeeded')) 
            }
            else {
                hendleAppError(response, dispatch)
            }
        })
        .catch((error) => {
            hendleNetworkError(error, dispatch)      
        }) 
    }
}

