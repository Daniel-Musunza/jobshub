import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
const Contact = () => {

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
        <h2>Contact Us</h2>
    </div>
    <div class="main-container">
        <div class="left-side">

        </div>
        <div className="contact-us">
      <div className="contact-form">
        <p>Have questions or feedback? Reach out to us!</p>
        <form>
          <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" name="name" placeholder="Your name" />

          <label htmlFor="email">Your Email:</label>
          <input type="email" id="email" name="email" placeholder="Your email" />

          <label htmlFor="message">Your Message:</label>
          <textarea id="message" name="message" placeholder="Type your message here"></textarea>

          <button type="submit">Send Message</button>
        </form>

        <div className="social-links">
          <h3>Connect with Us:</h3>
          <ul>
            <li>
              <a href="https://www.facebook.com/jetpulse" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com/jetpulse" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <strong>WhatsApp:</strong>{' '}
              <a href="https://api.whatsapp.com/send?phone=254794711950" target="_blank" rel="noopener noreferrer">
                +254 794 711 950
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
       <div class="right-side">

       </div>
    </div>
    </div>
  );
};

export default Contact;
