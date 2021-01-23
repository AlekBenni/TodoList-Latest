import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {GetTodolists, CreateTodolist, DeleteTodolist, UpdateTodolistTitle, GetTasks, DeleteTask, CreateTask} from './testAPI'

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

let TestingApi = () => {
    const classes = useStyles();
    return (
        <Grid container>   
        <Grid item xs={12}>            
            <Paper elevation={3} className={classes.pepperStyle} >
                <GetTodolists />
            </Paper>
        </Grid>
        <Grid item xs={12}>            
            <Paper elevation={3} className={classes.pepperStyle} >
                <CreateTodolist />
            </Paper>
        </Grid>

        <Grid item xs={12}>            
            <Paper elevation={3} className={classes.pepperStyle} >
                <DeleteTodolist />
            </Paper>
        </Grid>
        <Grid item xs={12}>            
            <Paper elevation={3} className={classes.pepperStyle} >
                <UpdateTodolistTitle />
            </Paper>
        </Grid>
        <Grid item xs={12}>            
            <Paper elevation={3} className={classes.pepperStyle} >
                <GetTasks />
            </Paper>
        </Grid>
        <Grid item xs={12}>            
            <Paper elevation={3} className={classes.pepperStyle} >
                <DeleteTask />
            </Paper>
        </Grid>
        <Grid item xs={12}>            
            <Paper elevation={3} className={classes.pepperStyle} >
                <CreateTask />
            </Paper>
        </Grid>
    </Grid>
    )
}

export default TestingApi





