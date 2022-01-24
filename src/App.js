import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import AddFriends from './components/AddFriends';
import FriendsList from './components/FriendsList';
import Logout from './components/Logout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
            <h3>Client Auth Project</h3>
            <Link to='/login' >Login</Link>
            <Link to='/friends' >Friends List</Link>
            <Link to='/friends/add' >Add Friend</Link>
            <Link to='/logout' >Logout</Link>
        </header>
        <Switch>
          <PrivateRoute path='/friends/add' component={AddFriends} />
          <PrivateRoute exact path='/friends' component={FriendsList} />
          <Route path='/logout' component={Logout} />
          <Route path='/login' component={Login} />
          <Route exact path='/' component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
