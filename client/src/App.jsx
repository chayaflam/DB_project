
import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.jsx'
import Register from './components/Register'
import Home from './components/Home'
// import Info from './components/Info';
// import Todos from './components/Todos';
// import Albums from './components/Albums';
// import Posts from './components/Posts';
// import NoPage from './components/NoPage';
// import Comments from './components/Comments';
// import Photos from './components/Photos';


export default function App() {

  return (
    <><Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
          <Route path="/users/:username" element={< Home />} >
            {/*<Route path="info" element={< Info />} />
            <Route path="todos" element={< Todos />} />
            <Route path="albums" element={< Albums />} >
              <Route path=":albumId" element={< Photos />} />
            </Route>
            <Route path="posts" element={< Posts />} />
            <Route path="posts/:postId" element={< Posts />} >
              <Route path="comments" element={< Comments />} />
            </Route > */}
          </Route>
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </div>
    </Router>
    </>
  )
}
