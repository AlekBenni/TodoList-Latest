import React, { useState, ChangeEvent, KeyboardEvent, useCallback } from 'react';
import AddItemForm from './AddItemForm';
import {FilterValuesType} from './App'
import EditableSpan from './EditableSpan'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import {TaskType} from './Todolist'

type TaskPropsType = {
    id:string
    item:TaskType
    removeTask: (id:string, todolistId:string) => void
    changeStatus: (taskId: string, isDone:boolean, todolistId:string) => void
    onChangeTitle: (title:string, id:string, todolistId:string) => void
}

export const Task = React.memo((props:TaskPropsType) => {
    // Удаление таски из массива
    const onRemoveHandler = () => { props.removeTask(props.item.id, props.id) }
    // Изменение статуса чекбокса
    const onChangeHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => 
    {props.changeStatus(props.item.id, e.currentTarget.checked, props.id)},[])
    // Изменение title
    const onChangeTitleHandler = useCallback((title:string) => {
        props.onChangeTitle(title, props.item.id, props.id)
    },[props.item.id, props.id, props.onChangeTitle])
        return (
            <li className={props.item.isDone? "isDone" : ""}
                key={props.item.id}>
                <Checkbox
                color="primary"
                onChange={onChangeHandler}
                checked={props.item.isDone}/> 
                <EditableSpan title={props.item.title} onChange={onChangeTitleHandler} />
                <IconButton
                color={"secondary"}
                onClick={onRemoveHandler}
                aria-label="delete">
                    <DeleteIcon />
                </IconButton>
                </li> )
})