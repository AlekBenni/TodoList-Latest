import React, { useCallback, useEffect } from 'react';
import { Todolist, TaskType } from './Todolist';
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
import { GetTodolists, CreateTodolist, DeleteTodolist, UpdateTodolistTitle, GetTasks, DeleteTask, CreateTask } from './testAPI'
import { TaskStatuses } from './API/todolist-api'
import LinearProgress from '@material-ui/core/LinearProgress'
import { ErrorSnackbar } from './ErrorSnackBar';
import { initAppTC, RequestStatusType } from './state/app-reducer'
import { BrowserRouter, Route } from 'react-router-dom';
import TodolistList from './TodolistList';
import { Login } from './Login/Login';
import CircularProgress from '@material-ui/core/CircularProgress'
import { logoutTC } from './Login/login-reducer';

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
    },
    progress: {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center'
    }
}));

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
    entityStatus?: string
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const classes = useStyles();

    const preLoader = useSelector<RootStateType, RequestStatusType>((state) => state.app.status)
    const initApp = useSelector<RootStateType, boolean>((state) => state.app.isAuth)
    const isLoginIn = useSelector<RootStateType, boolean>((state) => state.login.isLoginIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initAppTC())
    }, [])

    const logout = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!initApp) { return <div className={classes.progress}><CircularProgress color="secondary" /></div> }

    const demo = false

    return (
        <BrowserRouter>
            <div className="App">
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}> Todolists </Typography>
                        {isLoginIn === true && <Button onClick={logout} color="inherit">Logout</Button>}

                    </Toolbar>
                </AppBar>
                {preLoader === 'loading' && <LinearProgress color="secondary" />}
                <Container fixed>

                    <Route exact path={"/"} render={() => <TodolistList demo={demo} />} />
                    <Route path={"/login"} render={() => <Login />} />

                    <ErrorSnackbar />

                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
