import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {Simulate} from "react-dom/test-utils";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm (props: AddItemFormPropsType) {

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
            />
            <button
                onClick={addItem}
            >+
            </button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
}

export default AddItemForm