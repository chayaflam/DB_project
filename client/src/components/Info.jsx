import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../main";

const URL = `http://localhost:8080`;

export default function Info() {

    const [userInfo, setUserInfo] = useState({
        "name": '', "username": '', "email": '',
        "phone": '', "address": ''
    })
    const details = ["name", "username", "email", "phone", "address"]
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        userInfo.username == '' ? fetch(`${URL}/users/${user.username}`)
            .then(response => response.json())
            .then(json => {
                setUserInfo({
                    "name": json.data.name, "username": json.data.userName, "email": json.data.email,
                    "phone": json.data.phone, "address": json.data.address
                })
            }) : navigate('*');

    }, [])

    return (
        <>
            {user && <h1>Hi {userInfo.name}, here is your information:</h1>}
            {details.map((detail, index) =>
                <span key={index}><h3>{`${detail}:`}</h3>{`${userInfo[detail]} `}</span>)}
        </>
    )
}