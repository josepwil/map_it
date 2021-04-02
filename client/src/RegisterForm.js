import axios from 'axios';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'

function RegisterForm(props) {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('')
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault()

    if(!name) {
      setError('please enter name')
      return 0
    }
    if(!email) {
      setError('please enter email')
      return 0
    }
    if(!password) {
      setError('please enter password')
      return 0
    }

    if(password !== passwordConfirmation) {
      setError('passwords do not match')
      return 0
    }


    axios.post('/api/users', {
      email: email,
      name: name,
      password: password
    })
      .then(response => {
        if (response.data.status === 'created') {
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
      {error && <p style={{color: 'red'}}>{error}</p>}
      <input
        className='button' 
        type="submit"
        value="register"
      />
    </form>
    <Link id='loginLink' to="/">login</Link>
    </div>
  )
}

export default RegisterForm;