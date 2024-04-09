import React, { useContext, useState } from "react";
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserContext } from "../main";


const URL = `http://localhost:8080`;

const buttons = ['INFO', 'TODOS', 'POSTS']

const Home = () => {

    const { register, handleSubmit } = useForm();
    const [user, setUser] = useContext(UserContext)
    const [place, setPlace] = useState()
    const [update, setUpdate] = useState('');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear()
        setUser(null);
        navigate('/');
    }
    const updateUser = (data) => {
        let status;
        if (data.password != data.verifyPassword) return alert('password verification failed')
        fetch(`${URL}/users`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: data.password, userId: user.id })
        }).then(response => {
            status = response.status;
            return response.json()
        }).then(() => {
            setUpdate('');
        }).catch((error) => alert("Error:", error));
    }

    const verifyPassword = (data) => {
        let status;
        fetch(`${URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user.username, password: data.oldPassword })
        }).then((response) => {
            status = response.status;
            return response.json();
        }).then(() => {
            if (status != 200) return alert('verification failed')
            setUpdate('continue');
        }).catch(error => { alert("Error:" + error) })
    }


    return <>
        <nav className="navHome"><a onClick={() => setPlace('home')}><Link to={'.'}>{user.username}/</Link></a>
            <span>{buttons.map((btn, index) => { return <Link key={index} to={btn.toLowerCase()}><a onClick={() => setPlace(btn)}>{btn}</a></Link> })}</span>
            <button id="logout" onClick={() => logout()}>LOGOUT</button>
            <button id="logout" onClick={() => setUpdate('init')}>UPDATE PASSWORD</button>
            {update != '' && <> <form onSubmit={update == 'init' ? handleSubmit(verifyPassword) : (update == 'continue' ? handleSubmit(updateUser) : <></>)}>
                {update == 'init' && <><label>enter your password</label>
                    <input type="password" name="oldPassword" {...register("oldPassword")} required autoFocus autoComplete="off"></input>
                    <input type="submit" value="verify" />
                </>}
                {update == 'continue' && <><label>new password</label> <input type="password" name="password" {...register("password")} required autoFocus autoComplete="off"></input><br />
                    <label>verify new password</label><input type="password" name="verifyPassword" {...register("verifyPassword")} required  autoComplete="off"></input>
                    <input type="submit" value="submit" /></>}
            </form></>}
        </nav >
        <Outlet />
        {place == 'home' && <div></div>}
    </>
}
export default Home;