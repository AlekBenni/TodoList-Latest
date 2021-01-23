import React, { useCallback, useEffect } from 'react';
import {Todolist, TaskType} from './Todolist';
import './App.css'
import AddItemForm from './AddItemForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { removeTodolistTC, changeFilterAC, addTodolistTC, onChangeTodolistTC, fetchTodolistThunkTC } from './state/todolist-reducer';
import { removeTaskTC, addTaskTC, updateTaskTC, onChangeTitleAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from './state/store';
import {GetTodolists, CreateTodolist, DeleteTodolist, UpdateTodolistTitle, GetTasks, DeleteTask, CreateTask} from './testAPI'
import {TaskStatuses} from './API/todolist-api'
import LinearProgress from '@material-ui/core/LinearProgress'
import {ErrorSnackbar} from './ErrorSnackBar';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    contStyle: {
        padding: '25px'
    },
    pepperStyle: {
        padding: '10px 20px',
        marginBottom: '10px'
    }
  }));

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key:string]: Array<TaskType>
}

function App() {
    const classes = useStyles();

    const dispatch = useDispatch()

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

    // Добавление Todolists
    const addTodolist = useCallback((title:string) => {
       let action = addTodolistTC(title)
        dispatch(action)
    }, [dispatch])

    // Изменение title таски
    const onChangeTitle = useCallback((title:string, id: string, todolistId:string) => {
        dispatch(updateTaskTC(id, {title}, todolistId))
    },[dispatch])

    // Изменение Todolist title
    const onChangeTodolist = useCallback( (title:string, todolistId:string) => {
        dispatch(onChangeTodolistTC(title, todolistId))
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position="static" color="secondary">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}> Todolist </Typography>
                <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <LinearProgress color="secondary" />
            <Container fixed>
            <Grid container className={classes.contStyle} >
                <AddItemForm addItem={addTodolist} />
            </Grid>

            <Grid container>

            {todolists.map(todo => {
                // Фильтруем таски
                let taskForTodoList = tasks[todo.id]
                return (
                <Todolist title={todo.title}
                key={todo.id}
                id={todo.id}
                tasks={taskForTodoList} 
                removeTask={removeTask}
                removeTodolist={removeTodolist}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={todo.filter}
                onChangeTitle={onChangeTitle}
                onChangeTodolist={onChangeTodolist}
                />  
                )
            })}
            </Grid>
            <ErrorSnackbar />

            </Container>
        </div>
    );
}

export default App;
