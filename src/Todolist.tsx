import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Input from "./components/Input";
import EditableSpan from "./components/EditableSpan";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskId: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todoListID: string
    deleteToDoList: (todoListID: string) => void
    editTask: (todoListID: string, taskID: string, newTitle: string) => void
    editTodoList:(todoListID: string,newTitle: string)=>void
}

export function Todolist(props: PropsType) {

    const deleteToDoHandleer = () => {
        props.deleteToDoList(props.todoListID)
    }
    const onAllClickHandler = () => props.changeFilter(props.todoListID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListID, "completed");
    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todoListID, newTitle)
    }
    const editTaskHandler = (taskID: string, newTitle: string) => {
        props.editTask(props.todoListID, taskID, newTitle)
    }
const editTodolistHandler = (newTitle: string)=> {
        props.editTodoList(props.todoListID,newTitle)
}
    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={editTodolistHandler}/>
            <button onClick={deleteToDoHandleer}>X</button>
        </h3>
        <Input callBack={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todoListID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>

                        <EditableSpan title={t.title} callBack={(newTitle)=>editTaskHandler(t.id,newTitle)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
