import './App.css';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios';

function App() {

  const [activeUser, setActiveUser] = useState(null);

  // useEffect to get activeUser
  useEffect(() => {
    axios.get('/api/current_user')
      .then(res => {
        setActiveUser(res.data)
      })
  }, [activeUser])


  return (
    <Router>
      <Switch>
        <UserContext.Provider value={activeUser}>
        <Route path='/home'>
          <Home activeUser={activeUser}/>
        </Route>

        <Route path='/register'>
          <RegisterForm setActiveUser={setActiveUser}/>
        </Route>

        <Route path='/'>
          <div className="App">
            <LoginForm setActiveUser={setActiveUser}/>
          </div>
        </Route>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
