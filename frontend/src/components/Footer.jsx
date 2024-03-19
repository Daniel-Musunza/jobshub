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
                  <Link to="/profiles">Profiles</Link>
                  <Link to="/hackathons">Events</Link>
                  <Link to="/about">About Us</Link>
                  <Link to="/contact">Contact Us</Link>
                  
              </nav>
            </div>
            <div className="search">
                <h3>subscribe the newsletter</h3>
                <div className="input">
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <i class="fa-solid fa-share" onClick={handleSubscribe}></i>
                </div>
                <a href="img/terms.pdf" style={{textTransform: 'none'}}>Terms of Service</a>
            </div>
        </div>
    </section>
  )
}

export default Footer
