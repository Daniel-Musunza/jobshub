import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const [ showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (!user) {
    //   navigate('/login');
    // }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };


  return (
    <section className="header" id="header" style={{backgroundColor: 'black', height:'80px'}}>
    
        <div className="logo" style={{marginLeft: '20px'}}>
            <a href="#">
             <img src="img/logo.png" alt="" width="80px"/>
             </a>
        </div>
        <nav>
        <div className="navbar" style={{background: 'black', alignItems: 'center', justifyContent: 'center'}}>
            <Link to="/" style={{color: '#fff'}}>Jobs</Link>
            <Link to="/tech-blogs" style={{color: '#fff'}}>Tech Blogs</Link>
            <Link to="/hackathons" style={{color: '#fff'}}>Hackathons</Link>
            <Link to="/about" style={{color: '#fff'}}>About Us</Link>
            <Link to="/contact" style={{color: '#fff'}}>Contact Us</Link>
        </div>
       
        
               <div className="right-data">
                   <i className="fi fi-br-menu-burger" id="menu" style={{color: '#fff', fontSize: '40px', marginRight: '20px'}}></i>
                   {user ? (
                    <div style={{display: 'flex'}}>
                    <h4>{user && user.name}</h4>
                    <button onClick={onLogout}>Log Out</button>
                    </div>
                   ) : (
                    <button> <Link to="/login"> Log In</Link></button>
                   )}
                  

               </div>
        </nav>
      
   </section>
  )
}

export default Header
