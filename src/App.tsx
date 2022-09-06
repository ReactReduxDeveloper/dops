import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import Input from "./components/Input";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])
    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })


    /*/!*  let [tasks, setTasks] = useState([
          {id: v1(), title: "HTML&CSS", isDone: true},
          {id: v1(), title: "JS", isDone: true},
          {id: v1(), title: "ReactJS", isDone: false},
          {id: v1(), title: "Rest API", isDone: false},
          {id: v1(), title: "GraphQL", isDone: false},
      ]);*!/
      let [filter, setFilter] = useState<FilterValuesType>("all");*/


    function removeTask(todoListID: string, id: string) {
        let filteredTasks = tasks[todoListID].filter(t => t.id != id);
        setTasks({...tasks, [todoListID]: filteredTasks});
    }

    function addTask(todoListID: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks[todoListID]];
        setTasks({...tasks, [todoListID]: newTasks});
    }

    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }

    const editTask = (todoListID: string, taskID: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })
    }
    const editTodoList = (todoListID: string,newTitle: string) => {
        setTodolists(todolists.map(el=>el.id === todoListID ? {...el,title:newTitle} : el))
    }
    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todoListID ? {...el, filter: value} : el));
    }

    function deleteToDoList(todoListID: string) {
        setTodolists(todolists.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
    }

    const addToDoList = (newTitle: string) => {
        let newID = v1()
        let newToDoList: TodolistsType = {id: newID, title: newTitle, filter: "all"}
        setTodolists([...todolists, newToDoList])
        setTasks({...tasks, [newID]: []})
    }

    return (
        <div className="App">
            <Input callBack={addToDoList}/>
            {todolists.map((el) => {
                let tasksForTodolist = tasks[el.id];
                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }
                return (
                    <Todolist
                        key={el.id}
                        todoListID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        deleteToDoList={deleteToDoList}
                        editTask={editTask}
                        editTodoList={editTodoList}
                    />
                )
            })}

        </div>
    );
}

export default App;
