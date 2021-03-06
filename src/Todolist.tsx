import React, { useState, ChangeEvent, useEffect, useCallback } from 'react';
import AddItemForm from './AddItemForm';
import {FilterValuesType} from './App'
import EditableSpan from './EditableSpan'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Task } from './Task';
import { useDispatch } from 'react-redux';
import {fetchTasksThunkTC} from './state/tasks-reducer'
import {TaskStatuses} from '../src/API/todolist-api'

const useStyles = makeStyles({
    root: { },
    ulSTyle: {
      listStyle: 'none',
      margin: '0 0 15px 0',
      padding: '0'
    },
    middleButton: {
        margin: '0 5px'
    },
    peperStyle: {
        margin: '10px',
        padding: '15px'
    }
  });

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: any
    tasks: Array<TaskType>
    removeTask: (id:string, todolistId:string) => void
    removeTodolist: (todolistId:string) => void
    changeFilter: (filter: FilterValuesType, todolistId:string) => void
    addTask: (title:string,  todolistId:string) => void
    changeStatus: (taskId: string, status: TaskStatuses, todolistId:string) => void
    onChangeTitle: (title:string, id:string, todolistId:string) => void
    onChangeTodolist: (title:string, todolistId:string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    const dispatch = useDispatch()
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchTasksThunkTC(props.todolist.id))
    },[])

    // Удаление Todolist
    const onRemoveTodolistHandler = () => {
        props.removeTodolist(props.todolist.id)
    }

    let onChangeTodolistHandler = useCallback((title:string) => {
        props.onChangeTodolist(title, props.todolist.id)
    },[])

    // Фильтрация тасок
    const onAllClickHandler = useCallback(() => {props.changeFilter("all", props.todolist.id)},[props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => {props.changeFilter("active", props.todolist.id)},[props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => {props.changeFilter("completed", props.todolist.id)},[props.changeFilter, props.todolist.id])

    // Добавление таски
    const addTask = useCallback((title:string) => {
        props.addTask(title, props.todolist.id) }, [props.addTask, props.todolist.id])

        let taskForTodoList = props.tasks

        if( props.todolist.filter === "completed" ){
            taskForTodoList = props.tasks.filter(task => task.isDone === true)
        }
        if( props.todolist.filter === "active" ){
            taskForTodoList = props.tasks.filter(task => task.isDone === false)
        }

    return <Grid item>
        <Paper elevation={3} className={classes.peperStyle} >
        <h3><EditableSpan title={props.todolist.title} onChange={onChangeTodolistHandler} />
        <IconButton 
        color={"secondary"}
        disabled={props.todolist.entityStatus === 'loading'}
        onClick={onRemoveTodolistHandler}
        aria-label="delete">
            <DeleteIcon />
        </IconButton></h3>

       <AddItemForm addItem={addTask} />

        <ul className={classes.ulSTyle}>
            {taskForTodoList.map(item => {  
                return (
                <Task
                removeTask={props.removeTask}
                changeStatus={props.changeStatus}
                onChangeTitle={props.onChangeTitle}
                id={props.todolist.id}
                item={item}
                />)
            })}
        </ul>

        <div>
            <Button color={props.todolist.filter === 'all' ? "secondary" : "default"}
            variant={"contained"}
            onClick={onAllClickHandler}>All</Button>
            <Button color={props.todolist.filter === 'active' ? "secondary" : "default"}
            variant={"contained"}
            className={classes.middleButton}
            onClick={onActiveClickHandler}>Active</Button>
            <Button color={props.todolist.filter === 'completed' ? "secondary" : "default"}
            variant={"contained"}
            onClick={onCompletedClickHandler}>Completed</Button>
        </div>
        </Paper>
    </Grid>
})





