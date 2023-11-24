import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Create from './components/Create';
import Dashboard from './components/Dashboard';
import FullNote from './components/FullNote';
import Login from './components/Login';
import Register from './components/Register';

import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate authentication check
    const simulateAuthentication = async () => {
      try {
        const URL = `${process.env.REACT_APP_JWT_SECRET_KEY}/users/is-logged`;
        const options = {
          withCredentials: true,
          Credential: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const res = await axios.get(URL, options);
        setUsername(res.data.username);
        setIsLoggedIn(true);
      } catch (error) {
        console.log(error.response.data);
        setIsLoggedIn(false);
      }
    };

    simulateAuthentication();
  }, []);

  console.log(username, isLoggedIn);

  return (
    <AuthContext.Provider value={{ username, isLoggedIn, setIsLoggedIn }}>
      <Router>
        <Switch>
          {/* Auth Routes */}
          <Route exact path="/login">
            {isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/register">
            {isLoggedIn ? <Redirect to="/" /> : <Register />}
          </Route>

          {/* Protected Routes */}
          <Route exact path="/">
            {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/create">
            {isLoggedIn ? <Create /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/:id">
            {isLoggedIn ? <FullNote /> : <Redirect to="/login" />}
          </Route>

          {/* 404 Route */}
          {/* <Route exact path="*"></Route> */}
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
