import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { RootStateType } from './state/store';
import { setError } from './state/app-reducer'

const useStyles = makeStyles((theme) => ({
    alert: {
      width: '75vw'
    },
  }));

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    //const [open, setOpen] = React.useState(true)
    const classes = useStyles();
    const error = useSelector<RootStateType, string | null>((state) => state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
       //setOpen(false)
       dispatch(setError(null))
    }

    const isOpen = error !== null
    console.log(isOpen)

    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} className={classes.alert} severity="error">
                Hello! {error}
            </Alert>
        </Snackbar>
    )
}