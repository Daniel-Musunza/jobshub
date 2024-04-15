import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [casualJobs, setCasualJobs] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleCheckboxChange = (e) => {
    setAgreeTerms(e.target.checked);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast.error('Please agree to terms of service');
      return;
    }
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        phoneNumber,
        casualJobs,
        password
      };
      await dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isLoading) {
      return <Spinner />;
    }
    if (isError) {
      console.log('Failed to Register!');
      toast.error('Failed to Register!');
    }
    if (isSuccess || user) {
      toast.success('Registration Successful!');
      navigate('/profile');
      dispatch(reset());
    }
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  
  return (
    <div className="register">

      <section className='heading'>
        <h1>
          Register
        </h1>
      </section>
      <section className='form' style={{ minHeight: '380px', padding: '20px' }}>
        <h4>Already have an account ? <Link to='/login'>Sign In</Link></h4>
        <form onSubmit={onSubmit}  >
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              placeholder='Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              placeholder='Your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='phoneNumber'
              className='form-control'
              id='phoneNumber'
              name='phoneNumber'
              placeholder='Your Phone Number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder="List all Casual jobs you want to do"
              value={casualJobs}
              onChange={(e) => setCasualJobs(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder='Confirm password'
            />
          </div>

          <p style={{ color: '#fff', width: '100%' }}>
            Agree to terms and conditions{' '}
            <a href="img/terms.pdf" style={{ color: '#fff', textDecoration: 'underline' }}>Terms</a>
            <input
              type="checkbox"
              id="terms"
              name="terms"
              onChange={handleCheckboxChange}
              style={{ marginRight: '5px', fontSize: '30px', float: 'right' }}
            />
          </p>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Register
