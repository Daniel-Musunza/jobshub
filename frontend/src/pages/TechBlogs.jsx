import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
import { fetchUsers } from '../features/auth/authSlice';

const TechBlogs = () => {

  // Move the declaration of 'navigate' here before using it in the useEffect
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isError, isSuccess, message } = useSelector((state) => state.users);


  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(fetchUsers());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);



  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>

      <div class="heading">
        <h2>Workers' Profiles</h2>
      </div>

      <div class="main-container">
        <div class="left-side">

        </div>
        {users.length > 0 && (
          <div class="cards">
            {users
              .map((blog) => (
                <div className="card" key={blog.id}>

                  <div className="card-image">
                    <img src={`/uploads/${blog.profileImage}`} alt="Profile Image"
                      style={{
                        width: '100%',
                        height: '250px',
                        cursor: 'pointer',
                        objectFit: 'cover', // Maintain aspect ratio and cover the entire area
                      }} />
                  </div>
                  <div className="card-details">
                    <p className="card-title">{blog.name}</p>
                    <p className="card-body">{blog.location}</p>
                    <hr />
                    <p className="card-title">Services:</p>
                    <p className="card-body">{blog.casualJobs}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Link to={`/more-details/${blog.id}/profile`}>
                        <button className="btn">
                          More Details
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            height="15px"
                            width="15px"
                            className="icon"
                          >
                            <path
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              strokeWidth="1.5"
                              stroke="#292D32"
                              d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
                            ></path>
                          </svg>
                        </button>
                      </Link>
                      <div className='contact-detail'>
                        <a href={`tel: ${blog.phoneNumber}`}>
                          <i class="fa-solid fa-phone"></i> {blog.phoneNumber}
                        </a>
                        <a href={`https://api.whatsapp.com/send?phone=${blog.phoneNumber}`}>
                          <i class="fa-brands fa-square-whatsapp"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}


          </div>
        )}

        <div class="right-side">

        </div>
      </div>
    </div>
  );
};

export default TechBlogs;
