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
        <div className="about">
      <div className="about-content">
        <p>
          Welcome to our website! We are a passionate team dedicated to helping you in your tech journey. Whether you're
          looking for job opportunities, interested in participating in hackathons, or staying updated with the latest
          tech news and blogs, we've got you covered!
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
        <h3>Participate in Hackathons</h3>
        <p>
          Join exciting hackathons to showcase your skills, collaborate with fellow developers, and create innovative
          solutions to real-world challenges.
        </p>
      </div>

      <div className="about-section news-blogs">
        <h3>Tech News & Blogs</h3>
        <p>
          Stay updated with the latest tech news and insightful blogs. Our platform provides valuable information and
          perspectives on the ever-evolving world of technology.
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
