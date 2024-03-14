import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { passwordreset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'

function PasswordReset() {
    const {email} = useParams();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )




    const onSubmit = async(e) => {
        e.preventDefault()
        try {
            if (password !== password2) {
                toast.error('Passwords do not match');
            } else {
                const userData = {
                    email: email,
                    password: password
                };

                await dispatch(passwordreset(userData));
                
                    toast("successs ... proceed to login");
                    navigate('/login');
               
            

            }
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="register">


            <section className='heading' >

                <h1>
                    Password Reset
                </h1>
            </section>
            <section className='form' style={{ padding: '20px', minHeight: '380px' }}>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter password'
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

export default PasswordReset
