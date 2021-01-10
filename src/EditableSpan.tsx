import React, {ChangeEvent, useState} from 'react'
import TextField from '@material-ui/core/TextField';

type EditableSpanPropsType = {
    title: string
    onChange: (title:string) => void
}

export const EditableSpan = React.memo( (props:EditableSpanPropsType) => {

    let [editMode, seteditMode] = useState<boolean>(true)
    let [title, setTitle] = useState<string>('')

    let activateEditMode = () => { seteditMode(!editMode)
    setTitle(props.title)
    }
    let activateViewMode = () => { seteditMode(!editMode)
    props.onChange(title) }

    let onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
        ? <span onDoubleClick={activateEditMode}>{props.title}</span>
        : <TextField 
        id="outlined-search"
        variant="outlined"
        label="Change task" type="search"
        autoFocus={true}
        onBlur={activateViewMode}
        defaultValue={title}
        onChange={onChangeHandler}
        />
    )

})

export default EditableSpan