import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../main";

export default function Info() {

    const [userInfo, setUserInfo] = useState({
        "name": '', "username": '', "email": '',
        "phone": '', "address": ''
    })
    const details = ["name", "username", "email", "phone", "address"]
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        userInfo.name == '' ? fetch(`http://localhost:8080/users/${user.username}`)
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
                <span key={index}>{`${detail}: ${userInfo[detail]} `}</span>)}
        </>
    )
}