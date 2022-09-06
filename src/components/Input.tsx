import React, {ChangeEvent, KeyboardEvent, useRef, useState} from "react";

type InputType = {
    callBack: (newTitle: string) => void
}

function Input(props: InputType) {
    let myRef = useRef<HTMLInputElement>(null)
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {

        if (myRef.current) {
            props.callBack(myRef.current.value.trim());
            myRef.current.value = '';
        } else {
            setError("Title is required");
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
        }
    }

    return (
        <div>
            <input

                ref={myRef}
                onKeyDown={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default Input