import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    onChange: (newValue: string) => void
    value: string
}

function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState(props.value)

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
            ? <input value={title} autoFocus onBlur={activateViewMode} onChange={changeTitle}/>
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
}

export default EditableSpan