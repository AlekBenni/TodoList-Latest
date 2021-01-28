import { TaskType } from './../Todolist';
import axios from 'axios'
import { type } from 'os'

export const settings = {
    withCredentials: true,
    headers: {
      "API-KEY" : "92cb9125-732f-4ea5-be52-29a7802fd1c2"
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]   
    data: D
}

export type TasksType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
type GetTasksResponse = {
    items: TasksType[]
    totalCount: number
    error: string | null
}

export const todolistsAPI = {
    getTodos(){
        const promise = instance.get(`todo-lists`)
        return promise
    },
    createTodos(title:string){
        const promise = instance.post(`todo-lists`,{ title: title })
          return promise
    },
    deleteTodos(todoId:string){
        const promise = instance.delete<ResponseType>(`todo-lists/${todoId}`)
        return promise
    },
    upDataTodos(todoId:string, title:string){
        const promise = instance.put<ResponseType>(`todo-lists/${todoId}`,{ title: title})
          return promise
    },
    getTasks(todolistId:string){
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)              
    },
    deleteTask(todolistId:string, taskId:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
    createTask(todolistId:string, title:string){
        const promise = instance.post(`todo-lists/${todolistId}/tasks`,{ title: title })
          return promise
    }
}

export type LoginParamType = {
    email:string
    password:string
    rememberMe:boolean
    captcha?:string
}

export const authApi = {
    login(data:LoginParamType){
        const promise = instance.post<ResponseType<{UserId?:number}>>(`/auth/login`, data)
        return promise
    },
    me(){
        const promise = instance.get(`/auth/me`)
        return promise
    }
}

