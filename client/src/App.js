import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import LoginForm from './LoginForm'

function App() {

  // const [name, setName] = useState('')

  // useEffect(() => {
  //   axios.get('/api/users')
  //     .then((res) => {
  //       setName(res.data.name)
  //     })
  // }, [])

  return (
    <div className="App">
      {/* <h1>Name: {name}</h1> */}
      <LoginForm/>
    </div>
  );
}

export default App;
