import { useState } from 'react'

function LoginForm () {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
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
    </div>
  )
}

export default LoginForm;