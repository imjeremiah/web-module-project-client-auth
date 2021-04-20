import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import PrivateRoute from './components/PrivateRoute';

import './App.css';

function App() {
  const logout = () => {
    window.localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link onClick={logout} to="/login">Logout  </Link>
          </li>
          <li>
            <Link to="/friends-list">Friends</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute exact path ="/friends-list" component={FriendsList}/>
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
