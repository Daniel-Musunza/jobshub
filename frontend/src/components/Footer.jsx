import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Footer() {
  


  return (
    <section className="footer" id="footer" style={{marginBottom: 0}}>
        <div className="container">
            <div className="logo">
                <img src="img/logo.png" alt="" />
            </div>
            <div className="navbar">
                <nav>
                <Link to="/">Jobs</Link>
                <Link to="/tech-blogs">Tech Blogs</Link>
                <Link to="/hackathons">Hackathons</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact Us</Link>
            </nav>
            </div>
            <div className="search">
                <h1>subscribe the</h1>
                  <h1> newsletter</h1>
                <div className="input">
                    <input type="email" name="email" id="email" placeholder="email" />
                    <i className="fi fi-br-search"></i>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Footer
