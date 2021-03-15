import './App.css';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios';

function App() {

  const [state, setState] = useState({
    isLoggedIn: false,
    user: {}
  })

  const handleLogin = (data) => {
    setState({
      isLoggedIn: true,
      user: data.user
    })
  }
  const handleLogout = () => {
    setState({
    isLoggedIn: false,
    user: {}
    })
  }
  
  
  useEffect(() => {
    const loginStatus = () => {
      axios.get('/api/logged_in')    
        .then(response => {
          if (response.data.logged_in) {
            handleLogin(response)
          } else {
            handleLogout()
          }
          })
          .catch(error => console.log('api errors:', error))
    };
    loginStatus();
  }, [])


  return (
    <Router>
      <UserContext.Provider value={state}>
        <Switch>
          <Route path='/home'>
            <Home handleLogout={handleLogout}/>
          </Route>

          <Route path='/register' handleLogin={handleLogin}>
            <RegisterForm/>
          </Route>

          <Route path='/'>
              <LoginForm handleLogin={handleLogin}/>
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
