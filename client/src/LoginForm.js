import axios from 'axios';
import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

function LoginForm (props) {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/sessions', {
      email: email,
      password: password
    })
      .then(res => {
        props.setActiveUser(res.data.name)
        history.push('/home')
      })
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