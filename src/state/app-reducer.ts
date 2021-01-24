type InitialStateType = {
    status: RequestStatusType,
    error: null | string
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState:InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state:any = initialState, action: AppActionsType):InitialStateType => {
    switch(action.type){
        case 'SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'SET-ERROR' : {
            return {...state, error: action.error}
        }
    default:
        return state        
    }
}

type SetErrorType = {
    type: 'SET-ERROR'
    error:string | null
}

type SetStatusType = {
    type: 'SET-STATUS'
    status:RequestStatusType
}


export type AppActionsType = SetErrorType | SetStatusType

export const setError = (error:string | null):SetErrorType => ({type: 'SET-ERROR', error})
export const setStatus = (status:RequestStatusType):SetStatusType => ({type: 'SET-STATUS', status})