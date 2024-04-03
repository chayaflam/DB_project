import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
// import { VscTrash } from "react-icons/vsc";
// import { GrAdd,GrEdit } from "react-icons/gr";
import { UserContext } from "../main";

const URL = "http://localhost:8080/todos"

export default function Todos() {

    const [todos, setTodos] = useState([]);
    const [todosToShow, setTodosToShow] = useState([]);
    const [selectBy, setSelectBy] = useState('')
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        user ? fetch(`${URL}/${user.username}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user.id)
        })
            .then(response => { return response.json() })
            .then(json => {
                saveTodos(json)
            }).catch(error => console.log("Error", error)) : navigate('*')
    }, [])

    function saveTodos(json) {
        if (todos.length === 0) {
            setTodos(json)
            setTodosToShow(json)
        }
    }

    function changeTodoState(todo, i) {
        let newTodos = todosToShow.slice()
        newTodos[i].completed = !todo.completed
        fetch(`${URL}/${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify({ completed: newTodos[i].completed })
        }).then((response) => response.json())
            .then(() => {
                if (selectBy != 'completion') setTodosToShow(newTodos)
                else (setTodosToShow(newTodos.filter(t => t != todo)))
                setTodos(todos.filter(t => t == todo ? newTodos[i] : t))
            })
            .catch((error) => console.error("Error:", error));
    }

    const handleOrderBy = (event) => {
        event.preventDefault()
        console.log(todosToShow)
        let orderByTodos = todosToShow.slice();
        switch (event.target.value) {
            case 'by_alphabet': {
                orderByTodos.sort((a, b) => { return a.title < b.title ? -1 : 1 })
                break;
            } case 'by_completion': {
                orderByTodos.sort(a => { return a.completed ? -1 : 1 })
                break;
            } case 'random': {
                orderByTodos.sort(() => (Math.random() > 0.5) ? 1 : -1)
                break;
            }
            case 'by_id': {
            }
            default:
                orderByTodos.sort((a, b) => { return a.id - b.id })
        }
        setTodosToShow(orderByTodos)
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
                setTodosToShow(todos.filter(todo => todo.id.includes(event.target.value)))
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
        fetch(`${URL}/${todoId}`, {
            method: "DELETE",
            body: JSON.stringify(todoId)
        }).then((response) => response.json())
            .then(() => {
                setTodos(todos.filter(t => t.id != todoId))
                setTodosToShow(todosToShow.filter(t => t.id != todoId))
            })
            .catch((error) => console.error("Error:", error));
    }

    function renameTodo(index, todo) {
        let newTitle = prompt(`rename task ${todo.id}`, `${todo.title}`)
        if (newTitle && newTitle != todo.title) {
            let newTodos = todosToShow.slice()
            newTodos[index].title = newTitle;
            fetch(`${URL}/${todo.id}`, {
                method: "PATCH",
                body: JSON.stringify({ title: newTodos[index].title })
            }).then((response) => response.json())
                .then(() => {
                    if (selectBy != 'title') setTodosToShow(newTodos)
                    setTodos(todos.filter(t => t = todo ? newTodos[index] : t))
                })
                .catch((error) => console.error("Error:", error));
        }
    }

    const addTodo = () => {
        let newTodoTitle = prompt('Add new todo:', 'enter todo title')
        if (newTodoTitle && newTodoTitle != "enter todo title") {
            console.log(user.id)
            const newTodo = { "userId": user.id, "title": newTodoTitle, "completed": 0 }
            console.log(newTodo)
            fetch(`${URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTodo)
            }).then(response => response.json())
                .then(() => {
                    setTodos(prev => { return [...prev.data, newTodo] })
                    if (selectBy == '') setTodosToShow(prev => { return [...prev.data, newTodo] })
                })
                .catch(error => console.log("Error", error))
        }
    }


    return <>
        {todos.length > 0 && <h1>Todos</h1>}
        <div style={{ marginTop: "70px" }}></div>
        {todos.length == 0 && <h4>you have no todos. click to add a todo</h4>}
        <button id="addTodo" onClick={() => addTodo()}> add todo {/*<GrAdd />*/}</button><br />
        {todosToShow.length > 1 && <select name="orderBy" onChange={handleOrderBy}>
            <option value="" disabled selected hidden>order todos by...</option>
            <option value="by_id">by id</option>
            <option value="by_alphabet">by alphabet</option>
            <option value="by_completion">by completion</option>
            <option value="random">random order</option>
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
                {todosToShow.length > 0 ? todosToShow.map((todo, i) =>
                    <tr key={i}>
                        <td key={todo.id}>{todo.id}</td>
                        <td>{todo.title}</td>
                        <td key={todo.completed}><input type="checkbox" onChange={() => changeTodoState(todo, i)} checked={todo.completed} /></td>
                        <td><button onClick={() => renameTodo(i, todo)}>rename{/*<GrEdit/>*/}</button></td>
                        <td><button onClick={() => deleteTodo(todo.id)}>delete{/*<VscTrash />*/}</button></td>
                    </tr>) :
                    <tr>
                        <td key={todosToShow[0].id}>{todosToShow[0].id}</td>
                        <td key={todosToShow[0].title}>{todosToShow[0].title} </td>
                        <td key={todosToShow[0].completed}><input type="checkbox" onChange={() => changeTodoState(todosToShow[0], 0)} checked={todosToShow[0].completed} /></td>
                        <td><button onClick={() => renameTodo(i, todo)}>rename{/*<GrEdit/>*/}</button></td>
                        <td><button onClick={() => deleteTodo(todosToShow[0].id)}>delete{/*<VscTrash />*/}</button></td>
                    </tr>}
            </tbody>
        </table >}
    </>
}