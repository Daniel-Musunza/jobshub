import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
const About = () => {

  // Move the declaration of 'navigate' here before using it in the useEffect
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
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
        <div className="about">
          <div className="about-content">
            <p>
              Welcome to our website! We are a passionate team dedicated to helping you get vital opportunities. Whether you're looking for job opportunities, searching for a casual worker or a professional employee, or interested in participating in any kind of  events, we've got you covered!
            </p>
          </div>
          <div className="about-section news-blogs">
            <h3>Personalized Profile</h3>
            <p>
              Enhance your profile with your contact information, preferences for casual jobs, and desired professional roles.
            </p>
          </div>
          <div className="about-section jobs">
            <h3>Job Opportunities</h3>
            <p>
              Explore job opportunities in any industry. We connect talented individuals with innovative companies
              seeking skilled professionals.
            </p>
          </div>

          <div className="about-section hackathons">
            <h3>Participate in Events</h3>
            <p>
              Join exciting events to engage with communities, explore new ideas, and contribute to innovative solutions for real-world challenges.
            </p>
          </div>



        </div>
        <div class="right-side">

        </div>
      </div>
    </div>
  );
};

export default About;
