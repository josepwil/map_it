import axios from 'axios';
import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

function LoginForm (props) {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!email) {
      setError('please enter email')
      return 0
    }
    if(!password) {
      setError('please enter password')
      return 0
    }

    axios.post('/api/login', {
      email: email,
      password: password
    })
    .then(response => {
      console.log(response.data)
      if (response.data.status === 401) {
        setError(response.data.errors[0])
      }
      if (response.data.logged_in) {
        props.handleLogin(response.data)
        history.push('/home') 
      } 
    })
    .catch(error => console.log('api errors: ', error))
    
  }

  return (
    <div className='formContainer'>
    <h3>Mapper</h3>
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
      {error && <p style={{color: 'red'}}>{error}</p>}
      <input className='button' 
        type="submit"
        value="login"
      />
    </form>
    <Link id='registerLink' to="/register">register</Link>
    </div>
  )
}

export default LoginForm;