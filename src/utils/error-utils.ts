import { setError, setStatus } from './../state/app-reducer';

export const hendleAppError = (response:any, dispatch:any) => {
    if(response.data.messages.length){
        dispatch(setError(response.data.messages[0]))
    }else {
        dispatch(setError('Some error exist'))
    }
    dispatch(setStatus('failed')) 
}

export const hendleNetworkError = (error:{message:string}, dispatch:any) => {
    dispatch(setStatus('failed')) 
    dispatch(setError(error.message ? error.message : 'something wrong!'))  
}