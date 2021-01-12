import React, {ChangeEvent, useEffect, useState} from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {todolistsAPI} from './API/todolist-api'

export default {
   title: 'API'
}

export const settings = {
  withCredentials: true,
  headers: {
    "API-KEY" : "92cb9125-732f-4ea5-be52-29a7802fd1c2"
  }
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    todolistsAPI.getTodos().then((response) => {
      setState(response.data)
    })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
   const [state, setState] = useState<any>()
   const [title, setTitle] = useState('')
    const createTodolist = () => {
    todolistsAPI.createTodos(title).then((response) => {
      setState(response.data)
    }).catch(() => {alert("Something wrong in CreateTodolist!")})}
   return <div> 
        {JSON.stringify(state)}
        <p><TextField
          onChange={(e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}}
          id="outlined-password-input"
          label="Todolist Id"
          type="text"
          autoComplete="current-password"
          variant="outlined"
        /></p>
          <Button onClick={createTodolist} variant="contained" color="primary">
          createTodolist
          </Button>
          </div>
}

export const DeleteTodolist = () => {
   const [state, setState] = useState<any>()
   const [todoId, setTodoId] = useState('b2cf5e87-25ef-4231-bdd7-f787648799f5')
   const deleteTodolist = () => {
    todolistsAPI.deleteTodos(todoId)
    .then((response) => {
      setState(response)
    }).catch(() => {alert("Something wrong in DeleteTodolist!")})
   }
   return <div>      
        <p><TextField
          onChange={(e:ChangeEvent<HTMLInputElement>) => {setTodoId(e.currentTarget.value)}}
          id="outlined-password-input"
          label="Todolist Id"
          type="text"
          autoComplete="current-password"
          variant="outlined"
        /></p>
     <Button onClick={deleteTodolist} variant="contained" color="primary">
     deleteTodolist
    </Button>
     
      {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>()
   const [todoId, setTodoId] = useState('')
   const [title, setTitle] = useState('YO YO TODOLIST')
    const deleteTodolist = () => {
    todolistsAPI.upDataTodos(todoId, title).then((response) => {
      setState(response)
    }).catch(() => {alert("Something wrong in UpDataTodolist!")})}
   return <div> 
     {JSON.stringify(state)}
     <TextField
          onChange={(e:ChangeEvent<HTMLInputElement>) => {setTodoId(e.currentTarget.value)}}
          id="outlined-password-input"
          label="Todolist Id"
          type="text"
          autoComplete="current-password"
          variant="outlined"
        />
      <p><TextField
          onChange={(e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}}
          id="outlined-password-input"
          label="Title"
          type="text"
          autoComplete="current-password"
          variant="outlined"
        /></p>
        <Button onClick={deleteTodolist} variant="contained" color="primary">
        updateTodolist
        </Button>
     </div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>()
  const [todo, setTodo] = useState('2d56dd3d-b539-4375-8dd1-1d0556ed1010')
  const getTask = () => {
   todolistsAPI.getTasks(todo).then((response) => {
     setState(response.data)
   }).catch(() => {alert("Something wrong in getTasks!")})}
  return <div>
     {JSON.stringify(state)}
     <p><TextField
          onChange={(e:ChangeEvent<HTMLInputElement>) => {setTodo(e.currentTarget.value)}}
          id="outlined-password-input"
          label="Title"
          type="text"
          autoComplete="current-password"
          variant="outlined"
        /></p>
        <Button onClick={getTask} variant="contained" color="primary">
        getTask
        </Button>    
     </div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>()
  const [todolistId, setTodolistId] = useState('')
  const [taskId, setTaskId] = useState('')
 const deliteTask = () => {
   todolistsAPI.deleteTask(todolistId, taskId).then((response) => {
     setState(response.data)
   }).catch(() => {alert("Something wrong in deleteTasks!")})}
  return (
    <div>
      <TextField
          onChange={(e:ChangeEvent<HTMLInputElement>) => {setTodolistId(e.currentTarget.value)}}
          id="outlined-password-input"
          label="Todolist Id"
          type="text"
          autoComplete="current-password"
          variant="outlined"
        />
      <p><TextField
          onChange={(e:ChangeEvent<HTMLInputElement>) => {setTaskId(e.currentTarget.value)}}
          id="outlined-password-input"
          label="Task Id"
          type="text"
          autoComplete="current-password"
          variant="outlined"
        /></p>
        <Button onClick={deliteTask} variant="contained" color="primary">
        deliteTask
        </Button>
        <div> {JSON.stringify(state)}</div>
    </div>
  )
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')

  const createTask = () => {
      todolistsAPI.createTask(todolistId, taskTitle)
          .then((res) => {
              setState(res.data)
          })
  }

  return <div> {JSON.stringify(state)}
      <div>
          <input placeholder={'todolistId'} value={todolistId}
                 onChange={(e) => {
                     setTodolistId(e.currentTarget.value)
                 }}/>
          <input placeholder={'Task Title'} value={taskTitle}
                 onChange={(e) => {
                     setTaskTitle(e.currentTarget.value)
                 }}/>
          <button onClick={createTask}>create task</button>
      </div>
  </div>
}

// export const CreateTask = () => {
//   const [state, setState] = useState<any>()
//   const [todolistId, setTodolistId] = useState('')
//   const [title, setTitle] = useState('')
//  const createTask = () => {
//    todolistsAPI.createTask(todolistId, title).then((response) => {
//      setState(response.data)
//    }).catch(() => {alert("Something wrong in createTask!")})}
//   return (
//     <div>
//       <TextField
//           onChange={(e:ChangeEvent<HTMLInputElement>) => {setTodolistId(e.currentTarget.value)}}
//           id="outlined-password-input"
//           label="Todolist Id"
//           type="text"
//           autoComplete="current-password"
//           variant="outlined"
//         />
//       <p><TextField
//           onChange={(e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}}
//           id="outlined-password-input"
//           label="Title"
//           type="text"
//           autoComplete="current-password"
//           variant="outlined"
//         /></p>
//         <Button onClick={createTask} variant="contained" color="primary">
//         createTask
//         </Button>
//         <div> {JSON.stringify(state)}</div>
//     </div>
//   )
// }
