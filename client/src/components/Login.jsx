import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserContext } from "../main";

const URL = "http://localhost:8080"

export default function Login() {

    const [user, setUser] = useContext(UserContext)
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`${URL}/users?username=${user.username}`, {
                method: "GET"
                }).then(response => response.json())
                .then(json => {
                    if (json) navigate(`/users/${user.username}`)
                })
                .catch(error => console.log("Error:", error))
        }
        else navigate('/login')
    }, [])

    const loginHandleSubmit = (data) => {
        console.log(data)
        fetch(`${URL}/users`)
            .then(response => response.json())
            .then(json => checkPassword(json[0], data))
            .catch(error => {
                console.log("Error", error)
                alert('you need to register')
            })
    }

    function checkPassword(json, data) {
        console.log(json)
        if (json.website === data.password) {
            const currentUser = { username: json.username, id: json.id, email: json.email }
            localStorage.setItem('user', JSON.stringify(currentUser))
            setUser(currentUser)
            navigate(`/users/${data.username}`);
        }
        else alert('invalid username or password');
    }

    return <>
        <div className="login">
            <form onSubmit={handleSubmit(loginHandleSubmit)}>
                <h3 >LOGIN HERE</h3>
                <label>Username:<input type="text" name="username" {...register("username")} /></label><br />
                <label>Password:<input type="password" name="password" {...register("password")} /></label><br />
                <input type="submit" value="Submit" /><br />
                <a href="/register">new user? register here</a>
            </form>
        </div>
    </>
}