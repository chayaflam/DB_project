import React, { useState, useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../main";


const URL = "http://localhost:8080"

export default function Register() {

    const [user, setUser] = useContext(UserContext)
    const [formToShow, setFormToShow] = useState('initialForm')
    const [userId, setUserId] = useState();
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate();

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
            fetch(`${URL}/users/${user.username}`, {
                method: 'GET'
            }).then(response => response.json())
                .then(json => {
                    if (json)
                        navigate(`/users/${user.username}`)
                })
                .catch(error => alert("Error:", error))
        }
    }, [])

    const registerHandleSubmit = (data) => {
        let status;
        if (data.password != data.verifyPassword) return alert('password verification failed')
        fetch(`${URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((response) => {
            status = response.status;
            return response.json();
        }).then(dataFromServer => {
            if (status != 200) throw dataFromServer.error;
            setUserId(dataFromServer.id)
            setFormToShow('fullDetailsForm')
        })
            .catch(error => alert("Error:", error + "   you are not a new user, you need to log in"))
    }

    const addNewUser = (data) => {
        const dbUser = {
            "id": userId,
            "name": data.name,
            "userName": data.username,
            "email": data.email,
            "address": data.address,
            "phone": data.phone
        }
        fetch(`${URL}/users/${data.username}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dbUser)
        }).then(response => {
            return response.json();
        }).then(() => {
            const currentUser = { "username": dbUser.userName, "id": dbUser.id, "email": dbUser.email }
            setUser(currentUser)
            localStorage.setItem('user', JSON.stringify(currentUser))
            navigate(`/users/${dbUser.userName}`);
        }).catch((error) => alert("Error:", error));
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




