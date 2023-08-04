import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newValue: string, id: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
       props.addTask(title, props.id)
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const onTodolistTitleChangeHandler = (newValue: string) => {
        props.changeTodolistTitle(newValue, props.id);
    }

    return (
        <div>
            <div>
                    <h3>
                        <EditableSpan value={props.title} onChange={onTodolistTitleChangeHandler}/>
                        <button onClick={removeTodolist}>x</button>
                    </h3>
                <div>
                    <AddItemForm addItem={addTask}/>
                </div>
                <ul>
                    {
                        props.tasks.map(t => {
                            const onClickHandler = () => props.removeTask(t.id, props.id)
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked;
                                props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                            }
                            const onTitleChangeHandler = (newValue: string) => {
                                props.changeTaskTitle(t.id, newValue, props.id);
                            }


                            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                                <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                                <button onClick={onClickHandler}>x</button>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-filter' : ''}>All</button>
                    <button onClick={onActiveClickHandler} className={props.filter === 'active' ? 'active-filter' : ''}>Active</button>
                    <button onClick={onCompletedClickHandler} className={props.filter === 'completed' ? 'active-filter' : ''}>Completed</button>
                </div>
            </div>
        </div>
    );
}