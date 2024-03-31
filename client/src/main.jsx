import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

export const UserContext = createContext();

const RootComponent = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <React.StrictMode>
      <UserContext.Provider value={[ user, setUser ]}>
        <App />
      </UserContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<RootComponent />);