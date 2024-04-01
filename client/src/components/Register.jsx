import React, { useState, useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../main";


const URL = "http://localhost:8080"

export default function Register() {
    const [user, setUser] = useContext(UserContext)
    const { register, handleSubmit } = useForm()
    const [formToShow, setFormToShow] = useState('initialForm')
    const navigate = useNavigate()

    const initialForm =
        <>
            <label>Username:<input type="text" name="username" {...register("username")} required /></label><br />
            <label>Password:<input type="password" name="password" {...register("password")} required /></label><br />
            <label>Verify Password:<input type="password" name="verifyPassword" {...register("verifyPassword")} required /></label><br />
            <input type="submit" value="Submit" /><br />
        </>
    const fullDetailsForm =
        <>
            <label> Name:<input type="text" name="name" {...register("name")} required /></label><br />
            <label> Email:<input type="email" name="email" {...register("email")} required /></label><br />
            <label> Address:<input type="text" name="address" {...register("address")} required /></label><br />
            <label> Phone:<input type="text" name='phone' {...register("phone")} required /></label><br />
            <button type="submit">submit</button><br />
        </>

    useEffect(() => {
        if (user) {
            console.log(user)
            fetch(`${URL}/users?username=${user.username}`, {
                method: "GET"
            }).then(response => response.json())
                .then(json => {
                    if (json)
                        navigate(`/users/${user.username}`)
                })
                .catch(error => console.log("Error:", error))
        }
    }, [])

    const registerHandleSubmit = (data) => {
        fetch(`${URL}/users/${data.username}`, {
            method: "GET"
        }).then(response => response.json())
            .then(json => doesUserExist(json))
            .catch(error => console.log("Error:", error))
            (data.password != data.verifyPassword) ?
            alert('password verification failed') : <></>
    }

    function doesUserExist(json) {
        if (json.length > 0){
            console.log("json   " + json)
            alert(`${json[0].username}, you are not a new user, you need to log in`)
        }
        else
            setFormToShow('fullDetailsForm')
    }

    // ////   
    // const requestOptions = {
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ user: `${parseInt(user.id) + 1}` })
    // };
    // fetch('http://localhost:3000/nextId/1', requestOptions)
    //     .then(response => response.json())
    //     .then((data) => { });
    // ///

    const addUserToDB = (dbUser, currentUser) => {
        fetch(`${URL}/users`, {
            method: 'POST',
            body: JSON.stringify(dbUser)
        }).then(response => response.json())
            .then(json => {
                console.log(json)
                setUser(currentUser)
                localStorage.setItem('user', JSON.stringify(currentUser))
            }).catch((error) => console.error("Error:", error));
    }

    const addNewUser = (data) => {
        let id;
        fetch(`${URL}/nextID`, {
            method: 'GET'
        }).then(response => response.json())
            .then(json => {
                id = json[0].nextUserId
                const dbUser = {
                    "id": '' + id, "name": data.name, "username": data.username,
                    "email": data.email, "address": data.address, "phone": data.phone
                }
                const currentUser = { "username": dbUser.username, "id": dbUser.id, "email": dbUser.email }
                addUserToDB(dbUser, currentUser)
                navigate(`/users/${dbUser.username}`);
            }).catch((error) => console.error("Error:", error));
    }

    return <>
        <div className="register">
            <form onSubmit={formToShow === 'initialForm' ?
                handleSubmit(registerHandleSubmit) : handleSubmit(addNewUser)}>
                <h3>REGISTER HERE</h3>
                {formToShow == 'initialForm' && initialForm}
                {formToShow == 'fullDetailsForm' && fullDetailsForm}
                <a href="/login">already have an account ? login here</a>
            </form>

        </div>
    </>
}




