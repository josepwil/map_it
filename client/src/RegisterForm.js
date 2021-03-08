import { useState } from 'react';
import { Link } from 'react-router-dom'

function RegisterForm() {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const handleSubmit = () => {
    console.log('submitting')
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