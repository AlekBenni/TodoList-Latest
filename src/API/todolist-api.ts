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

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

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
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    items: TasksType[]
    totalCount: number
    error: string | null
}

export const todolistsAPI = {
    getTodos(){
        const promise = instance.get<Array<TodolistType>>(`todo-lists`)
        return promise
    },
    createTodos(title:string){
        const promise = instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`,{ title: title })
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
    updateTask(todolistId:string, taskId:string, model:UpdateTaskModelType) {
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId:string, title:string){
        const promise = instance.post(`todo-lists/${todolistId}/tasks`,{ title: title })
          return promise
    }
}