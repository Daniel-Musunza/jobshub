import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success("Success...")
      navigate('/');
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])



  const onSubmit = (e) => {
    e.preventDefault()
    try {
      const userData = {
        email,
        password,
      }

      dispatch(login(userData));
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="register">


      <section className='heading' >

        <h1>
          Login
        </h1>
      </section>
      <section className='form' style={{ padding: '20px', minHeight: '380px' }}>
      <h4>Don't have an account yet? <Link to='/register'>Register</Link></h4>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              placeholder='Enter Your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
          <h4><Link to='/forgotpassword'>Forgot Password</Link></h4>
        </form>
      </section>
    </div>

  )
}

export default Login
