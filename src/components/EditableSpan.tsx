import React, {ChangeEvent, KeyboardEvent, useRef, useState} from "react";

type EditableSpanType = {
    title: string
    callBack:(newTitle:string)=>void
}
const EditableSpan = (props: EditableSpanType) => {
    const onDobleClickHandler = () => {
        setEdit(!edit)
        addTitle()
    }
    const addTitle = ()=> {
        if (newTitle !== "") {
            props.callBack(newTitle)
        }
    }
    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setEdit(!edit);
        }
    }
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    return (
        edit ?

            <input onKeyDown={onKeyPressHandler} onChange={onchangeHandler} autoFocus onBlur={onDobleClickHandler}
                   value={newTitle}/>
            :
            <span onDoubleClick={onDobleClickHandler}>{newTitle}</span>


    )
}
export default EditableSpan
