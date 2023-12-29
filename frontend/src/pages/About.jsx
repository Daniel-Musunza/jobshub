import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
const About = () => {

  // Move the declaration of 'navigate' here before using it in the useEffect
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <div>
       <div class="heading">
        <h2>About Us</h2>
    </div>
    <div class="main-container">
        <div class="left-side">

        </div>
        <div class="cards">
            
        </div>
       <div class="right-side">

       </div>
    </div>
    </div>
  );
};

export default About;
