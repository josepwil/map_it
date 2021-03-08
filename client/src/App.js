import './App.css';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from 'react'

function App() {

  const [activeUser, setActiveUser] = useState('');


  return (
    <Router>
      <Switch>
        <Route path='/home'>
          <Home activeUser={activeUser}/>
        </Route>

        <Route path='/register'>
          <RegisterForm />
        </Route>
        
        <Route path='/'>
          <div className="App">
            <LoginForm setActiveUser={setActiveUser}/>
          </div>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
