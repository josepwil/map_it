import axios from 'axios';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'

function RegisterForm(props) {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault()

    if(password !== passwordConfirmation) {
      console.log('passwords do not match')
      return 0;
    }
    axios.post('/api/users', {
      email: email,
      name: name,
      password: password
    })
      .then(res => {
        props.setActiveUser(res.data.name)
        history.push('/home')
      })

  }

  return (
    <div>
    <h3>Register</h3>
    <form onSubmit={(event => handleSubmit(event))}>
      <input 
        type="text" 
        value={name} 
        onChange={e => setName(e.target.value)}
        placeholder="name"
      />
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
        type="password" 
        value={passwordConfirmation} 
        onChange={e => setPasswordConfirmation(e.target.value)}
        placeholder="confirm password"
      />
      <input 
        type="submit"
        value="register"
      />
    </form>
    <Link to="/">Sign in</Link>
    </div>
  )
}

export default RegisterForm;