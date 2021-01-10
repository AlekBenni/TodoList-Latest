import React, {useState, ChangeEvent, KeyboardEvent} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
    root: { },
    inputStyle: {
        transform: 'translateY(-11px)'
    },
  }));

type AddItemPropsType = {
    addItem: (title:string) => void
}

export const AddItemForm = React.memo((props:AddItemPropsType) => {
    const classes = useStyles();
console.log('Add item render')
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const [error, setError] = useState<null | string>(null)

    // Изменение значения в input
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)}   

    // Добавление при нажатии Enter в input
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(newTaskTitle.trim() !== ''){
        if (e.charCode === 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')  } }
            else{setError("error")} }
    
    // Добавление при нажатии кнопки
    const addTask = () => {
        if(newTaskTitle.trim() !== ''){
        props.addItem(newTaskTitle)
            setNewTaskTitle('')}
        else{setError("error")}}

    return (
    <div>
        <TextField
        id="standard-multiline-flexible"
        label="Add element" 
        error={!!error}
        value={ newTaskTitle }
        onChange={ onChangeHandler }
        onKeyPress={ onKeyPressHandler }
        className={classes.inputStyle}
        helperText={error? 'Title is required!' : null}
        />
        <Button
        variant="contained" 
        onClick={addTask}
        color="secondary">Go!</Button>
    </div>
    )
})

export default AddItemForm
