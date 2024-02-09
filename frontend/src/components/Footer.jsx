import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { subscribe } from '../features/subscriptions/subscriptionSlice';
function Footer() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    const newEmail = {
      email: email
    }
    dispatch(subscribe(newEmail));
    alert("Subscribed successfully ..")
  }

  return (
    <section className="footer" id="footer" style={{marginBottom: 0}}>
        <div className="container">
            <div className="logo">
                <img src="img/logo.png" alt="" />
            </div>
            <div className="navbar">
              <nav>
                  <Link to="/">Jobs</Link>
                  <Link to="/profiles">Workers</Link>
                  <Link to="/hackathons">Events</Link>
                  <Link to="/about">About Us</Link>
                  <Link to="/contact">Contact Us</Link>
              </nav>
            </div>
            <div className="search">
                <h1>subscribe the</h1>
                  <h1> newsletter</h1>
                <div className="input">
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <i class="fa-solid fa-share" onClick={handleSubscribe}></i>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Footer
