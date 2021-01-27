import React, { useCallback, useEffect } from 'react';
import {Todolist, TaskType} from './Todolist';
import './App.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { addTodolistTC, fetchTodolistThunkTC } from './state/todolist-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from './state/store';
import {GetTodolists, CreateTodolist, DeleteTodolist, UpdateTodolistTitle, GetTasks, DeleteTask, CreateTask} from './testAPI'
import {TaskStatuses} from './API/todolist-api'
import LinearProgress from '@material-ui/core/LinearProgress'
import {ErrorSnackbar} from './ErrorSnackBar';
import {RequestStatusType} from './state/app-reducer'
import { BrowserRouter } from 'react-router-dom';
import TodolistList from './TodolistList';

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
    entityStatus? :string
}

export type TaskStateType = {
    [key:string]: Array<TaskType>
}

function App() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const preLoader = useSelector<RootStateType, RequestStatusType>((state) => state.app.status)

    return (
        <BrowserRouter>
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
            {preLoader === 'loading' && <LinearProgress color="secondary" /> }
            <Container fixed>

            <TodolistList/>
  
            <ErrorSnackbar />

            </Container>
        </div>
        </BrowserRouter>
    );
}

export default App;
