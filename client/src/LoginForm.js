import axios from 'axios';
import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

function LoginForm (props) {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/login', {
      email: email,
      password: password
    })
    .then(response => {
      if (response.data.logged_in) {
        props.handleLogin(response.data)
        history.push('/home') 
      } 
    })
    .catch(error => console.log('api errors: ', error))
    
  }

  return (
    <div>
    <h3>Login</h3>
    <form onSubmit={(event => handleSubmit(event))}>
      <input 
        type="text" 
        value={email} 
        onChange={e => setEmail(e.target.value)}
        placeholder="email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)}
        placeholder="password"
      />
      <input 
        type="submit"
        value="login"
      />
    </form>
    <Link to="/register">Register</Link>
    </div>
  )
}

export default LoginForm;