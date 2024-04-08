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
            fetch(`${URL}/users/${user.username}`, {
                method: 'GET'
            }).then(response => response.json())
                .then(json => {
                    if (json) navigate(`/users/${user.username}`)
                })
                .catch(error => console.log("Error:", error))
        }
        else navigate('/login');
    }, [])

    const loginHandleSubmit = (data) => {
        let status;
        fetch(`${URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((response) => {
            status = response.status;
            return response.json();
        }).then(dataFromServer => {
            if (status != 200) throw dataFromServer.error;
            setUser(prev => ({ ...prev, username: data.username, id: dataFromServer.id }));
            localStorage.setItem('user', JSON.stringify({ username: data.username, id: dataFromServer.id, email: dataFromServer.email }))
            navigate(`/users/${data.username}`);
        }).catch(error => { alert("Error:" + error) })
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