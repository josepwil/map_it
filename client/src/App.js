import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [name, setName] = useState('')

  useEffect(() => {
    axios.get('/api/users')
      .then((res) => {
        setName(res.data.name)
      })
  }, [])

  return (
    <div className="App">
      <h1>Name: {name}</h1>
    </div>
  );
}

export default App;
