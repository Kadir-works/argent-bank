import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../store/authSlice'
import { login } from '../services/authService'
import { useNavigate } from 'react-router-dom'


function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

const handleSubmit = async (e) => {
  e.preventDefault()
  setError(null)

  try {
    const data = await login(email, password)

    dispatch(
      loginSuccess(data.body.token)
    )

    navigate('/profile') 
  } catch (err) {
    setError('Invalid credentials')
  }
}


  return (
    <div>
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign In</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  )
}

export default SignIn
