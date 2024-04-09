import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { VscTrash } from "react-icons/vsc";
import { GrAdd, GrEdit } from "react-icons/gr";
import { UserContext } from "../main";

const URL = "http://localhost:8080/todos"

export default function Todos() {

    const [user, setUser] = useContext(UserContext)
    const [todos, setTodos] = useState([]);
    const [todosToShow, setTodosToShow] = useState([]);
    const [selectBy, setSelectBy] = useState('')
    const [sortBy, setSortBy] = useState('id')
    const navigate = useNavigate();

    useEffect(() => {
        user ? fetch(`${URL}?userId=${user.id}&sort=${sortBy}`, {
            method: 'GET'
        }).then(response => {
            return response.json()
        }).then(json => {
            saveTodos(json.data)
        }).catch(error => alert("Error", error)) : navigate('*')
    }, [sortBy])

    function saveTodos(data) {
        if (data.length != 0) {
            setTodos(data)
            setTodosToShow(data)
        }
    }

    function changeTodoState(todo, i) {
        let newTodos = todosToShow.slice()
        newTodos[i].completed = !todo.completed
        fetch(`${URL}/${todo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: newTodos[i].completed })
        }).then((response) => {
            return response.json()
        }).then(() => {
            if (selectBy != 'completion') setTodosToShow(newTodos)
            else (setTodosToShow(newTodos.filter(t => t != todo)))
            setTodos(todos.filter(t => t == todo ? newTodos[i] : t))
        }).catch((error) => alert("Error:", error));
    }

    const handleOrderBy = (event) => {
        event.preventDefault()
        setSortBy(event.target.value)
    }

    const handleSelectBy = (event) => {
        event.preventDefault()
        switch (event.target.value) {
            case "title": {
                setSelectBy('title')
                break;
            }
            case "id": {
                setSelectBy('id')
                break;
            }
            case "completion": {
                setSelectBy('completion')
                break;
            }
        }
    }

    const searchBy = (event) => {
        if (event.target.value.length > 0) switch (selectBy) {
            case "title": {
                setTodosToShow(todos.filter(todo => todo.title.includes(event.target.value)))
                break;
            }
            case "id": {
                setTodosToShow(todos.filter(todo => todo.id == event.target.value))
                break;
            }
            case "completion": {
                setTodosToShow(todos.filter(todo => todo.completed == (event.target.value == 'completed')))
                break;
            }
        }
        else setTodosToShow(todos.slice())
    }

    function deleteTodo(todoId) {
        let status;
        fetch(`${URL}/${todoId}`, {
            method: 'DELETE',
            body: JSON.stringify(todoId)
        }).then((response) => {
            status = response.status;
            return response.json()
        }).then((dataFromServer) => {
            if (status != 200) throw dataFromServer.error;
            setTodos(todos.filter(t => t.id != todoId))
            setTodosToShow(todosToShow.filter(t => t.id != todoId))
        }).catch((error) => alert("Error:", error));
    }

    function renameTodo(index, todo) {
        let newTitle = prompt(`rename task ${todo.id}`, `${todo.title}`)
        if (newTitle && newTitle != todo.title) {
            let newTodos = todosToShow.slice()
            newTodos[index].title = newTitle;
            fetch(`${URL}/${todo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTodos[index].title })
            }).then((response) => {
                return response.json()
            }).then(() => {
                if (selectBy != 'title') setTodosToShow(newTodos)
                setTodos(todos.filter(t => t = todo ? newTodos[index] : t))
            }).catch((error) => alert("Error:", error));
        }
    }

    const addTodo = () => {
        let status;
        let newTodoTitle = prompt('Add new todo:', 'enter todo title')
        if (newTodoTitle && newTodoTitle != "enter todo title") {
            const newTodo = { "userId": user.id, "title": newTodoTitle, "completed": 0 }
            fetch(`${URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTodo)
            }).then(response => {
                status = response.status;
                return response.json()
            }).then(dataFromServer => {
                if (status != 200) throw dataFromServer.error;
                setTodos(prev => ([...prev,
                {
                    "id": dataFromServer.id,
                    "userId": newTodo.id,
                    "title": newTodo.title,
                    "completed": newTodo.completed
                }]));
                if (selectBy == '')
                    setTodosToShow(prev => ([...prev,
                    {
                        "id": dataFromServer.id,
                        "userId": newTodo.id,
                        "title": newTodo.title,
                        "completed": newTodo.completed
                    }]))
            }).catch(error => alert("Error", error))
        }
    }


    return <>
        {todos && <h1>Todos</h1>}
        <div style={{ marginTop: "70px" }}></div>
        {todos.length == 0 && <h4>you have no todos. click to add a todo</h4>}
        <button id="addTodo" onClick={() => addTodo()}> add todo</button><br />
        {todosToShow.length > 1 && <select name="orderBy" onChange={handleOrderBy}>
            <option value="" disabled selected hidden>order todos by...</option>
            <option value="id">by id</option>
            <option value="title">by alphabet</option>
            <option value="completed">by completion</option>
            <option value="rand()">random order</option>
        </select>}
        {todosToShow.length > 1 && selectBy == '' && <select onChange={handleSelectBy}>
            <option value="" disabled selected hidden>select by...</option>
            <option value="id">id</option>
            <option value="title">Title</option>
            <option value="completion">Completion</option>
        </select>}
        {selectBy != '' && selectBy != 'completion' && <input autoFocus onChange={searchBy}></input>}
        {todosToShow.length > 0 && selectBy == 'completion' && <><label htmlFor="completion">completed</label><input type="radio" id="completion" name="completion" value="completed" onChange={searchBy} />
            <label htmlFor="not_completion">not completed</label><input type="radio" id="not_completion" name="completion" value="not_completed" onChange={searchBy} /></>}
        {selectBy != '' && <><br /><button onClick={() => { setSelectBy(''), setTodosToShow(todos.slice()) }}>back</button></>}
        {todosToShow.length > 0 && <table>
            <thead>
                <tr>
                    <th>Id:</th>
                    <th>Title</th>
                    <th>Is Completed:</th>
                </tr>
            </thead>
            <tbody>
                {todosToShow && todosToShow.map((todo, i) =>
                    <tr key={i}>
                        <td key={todo.id}>{todo.id}</td>
                        <td>{todo.title}</td>
                        <td key={todo.completed}><input type="checkbox" onChange={() => changeTodoState(todo, i)} checked={todo.completed} /></td>
                        <td><button onClick={() => renameTodo(i, todo)}>rename<GrEdit /></button></td>
                        <td><button onClick={() => deleteTodo(todo.id)}>delete<VscTrash /></button></td>
                    </tr>)
                }
            </tbody>
        </table >}
    </>
}