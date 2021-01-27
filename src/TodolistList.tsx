import React, { useCallback, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodolistTC, changeFilterAC, addTodolistTC, onChangeTodolistTC, fetchTodolistThunkTC } from './state/todolist-reducer';
import { removeTaskTC, addTaskTC, updateTaskTC, onChangeTitleAC } from './state/tasks-reducer';
import {Todolist, TaskType} from './Todolist';
import { RootStateType } from './state/store';
import {TodolistType, TaskStateType, FilterValuesType} from './App'
import AddItemForm from './AddItemForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    contStyle: {
        padding: '25px'
    },
  }));

  type PropsType = {
    demo?: boolean
}

const TodolistList: React.FC<PropsType> = ({demo = false}) => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const todolists = useSelector<RootStateType,Array<TodolistType>>((state) => state.todolists)
    const tasks = useSelector<RootStateType, TaskStateType>((state) => state.tasks)

    useEffect(() => {
        dispatch(fetchTodolistThunkTC())
    },[])

    // Удаляем таску
    const removeTask = useCallback((id:string, todolistId:string) => {
        dispatch(removeTaskTC(id, todolistId)) 
    }, [dispatch])

    // Удаляем Todolist
    const removeTodolist = useCallback((todolistId:string) => {
        let thank = removeTodolistTC(todolistId)
        dispatch(thank)
    },[dispatch])

    // Добавляем таску в массив таск
    const addTask = useCallback((title:string, todolistId:string) => {
        dispatch(addTaskTC(title, todolistId))
    },[dispatch])

    // Задаём значение в state для фильтрации таски в Todolist
    const changeFilter = useCallback( (filter:FilterValuesType, todolistId:string) => {
        dispatch(changeFilterAC(filter, todolistId))
    }, [dispatch])

    // Меняем статус чекбокса таски
    const changeStatus = useCallback((taskId: string, status:any, todolistId:string) => {
        dispatch(updateTaskTC(taskId, {status}, todolistId))
    },[dispatch])

    // Изменение title таски
    const onChangeTitle = useCallback((title:string, id: string, todolistId:string) => {
        dispatch(updateTaskTC(id, {title}, todolistId))
    },[dispatch])

    // Изменение Todolist title
    const onChangeTodolist = useCallback( (title:string, todolistId:string) => {
        dispatch(onChangeTodolistTC(title, todolistId))
    }, [dispatch])

        // Добавление Todolists
        const addTodolist = useCallback((title:string) => {
            let action = addTodolistTC(title)
             dispatch(action)
         }, [dispatch])

    return (
        <>
        <Grid container className={classes.contStyle} >
        <AddItemForm addItem={addTodolist} />
        </Grid>
             <Grid container>
            {todolists.map(todo => {
                // Фильтруем таски
                let taskForTodoList = tasks[todo.id]
                return (
                <Todolist
                todolist={todo}
                key={todo.id}
                tasks={taskForTodoList} 
                removeTask={removeTask}
                removeTodolist={removeTodolist}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                onChangeTitle={onChangeTitle}
                onChangeTodolist={onChangeTodolist}
                />  
                )
            })}
            </Grid>     
            </>
    )
}

export default TodolistList