import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { forgotpassword } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )




    const onSubmit = async(e) => {
        e.preventDefault()
        try {
            const userData = {
                email
            }
           await dispatch(forgotpassword(userData));

                return toast.success("Success...Confirm we have sent an email to you for password reset.");
         
            navigate('/login');
            
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
                    Forgot Password
                </h1>
            </section>
            <section className='form' style={{ padding: '20px', minHeight: '380px' }}>
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
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>

                </form>
            </section>
        </div>

    )
}

export default ForgotPassword
