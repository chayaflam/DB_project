import React, { useContext, useState } from "react";
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { UserContext } from "../main";
// import { VscAccount } from "react-icons/vsc";
// import { RiLogoutCircleRLine } from "react-icons/ri";


const buttons = ['INFO', 'TODOS', 'ALBUMS', 'POSTS']

const Home = () => {
    
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext)
    const [place, setPlace] = useState()


    const logout = () => {
        localStorage.clear()
        setUser(null);
        navigate('/');
    }

    return <>
        <nav className="navHome"><a onClick={()=>setPlace('home')}><Link to={'.'}><VscAccount/>{user.username}/</Link></a>
            <span>{buttons.map((btn, index) => { return <Link key={index} to={btn.toLowerCase()}><a onClick={()=>setPlace(btn)}>{btn}</a></Link> })}</span>
            <button id="logout" onClick={() => logout()}>LOGOUT<RiLogoutCircleRLine/></button>
        </nav>
        <Outlet/>
        {place == 'home' && <div><VscAccount/></div>}
    </> 
}
export default Home;
