import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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

  const toggleProfile = () => {
    setShowProfile((prevShowProfile) => !prevShowProfile);
  };
  const closeProfile = () => {
    setShowProfile(false);
  };
  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };


  return (
    <section className="header" id="header" style={{ backgroundColor: 'black', height: '80px' }}>

      <div className="logo" style={{ marginLeft: '20px' }}>
        <a href="#">
          <img src="/img/logo.png" alt="" width="80px" />
        </a>
      </div>
      <i className="fi fi-br-menu-burger" style={{ color: '#fff', fontSize: '40px', marginRight: '20px' }} onClick={toggleMenu}></i>


      <nav>
        <div className="navbar" style={{ background: 'black', alignItems: 'center', justifyContent: 'center' }}>
          <Link to="/" style={{ color: '#fff' }}>Jobs</Link>
          <Link to="/profiles" style={{ color: '#fff' }}>Workers</Link>
          <Link to="/hackathons" style={{ color: '#fff' }}>Events</Link>
          <Link to="/about" style={{ color: '#fff' }}>About Us</Link>
          <Link to="/contact" style={{ color: '#fff' }}>Contact Us</Link>
        </div>

        <div className="right-data">
          {user ? (
            <div className='profile' style={{ display: 'flex' }} onClick={toggleProfile}>
              {user.profileImage ? (
                <img
                  src={`/uploads/${user.profileImage}`}
                  style={{
                    width: '50px',
                    height: '50px', // Ensure the height matches the width for a perfect circle
                    marginRight: '20px',
                    borderRadius: '50%', // Make it circular
                    cursor: 'pointer',
                    objectFit: 'cover', // Maintain aspect ratio and cover the entire area
                  }}
                  alt="Profile Image"
                />

              ) : (
                <i class="fa-solid fa-user" style={{ color: '#fff', fontSize: '40px', marginRight: '20px', cursor: 'pointer' }} ></i>

              )}


            </div>
          ) : (
            <>
              <button> <Link to="/login"> Log In</Link></button>
               <Link to="/register" style={{paddingLeft: '10px'}}> Get Started</Link>
            </>
          )}

        </div>
      </nav>
      {showMenu && (
        <div className='mobile-nav' onClick={closeMenu}>
          <div className="right-data" style={{ marginTop: '50px', marginBottom: '0px' }}>
            <button onClick={closeMenu} style={{ width: '80px', marginBottom: '0px' }}>close</button>
          </div>

          <div className="navbar" style={{ background: 'black', alignItems: 'center', justifyContent: 'center' }}>
            {user && (
              <>
                <img
                  src={`/uploads/${user.profileImage}`}
                  style={{
                    width: '50px',
                    height: '50px', // Ensure the height matches the width for a perfect circle
                    marginRight: '20px',
                    borderRadius: '50%', // Make it circular
                    cursor: 'pointer',
                    objectFit: 'cover', // Maintain aspect ratio and cover the entire area
                  }}
                  alt="Profile Image"
                />
                <h4>{user && user.name}</h4>
                <Link to="/profile" style={{ color: '#fff' }}>Profile View</Link>
              </>
            )}
            <Link to="/" style={{ color: '#fff' }}>Jobs</Link>
            <Link to="/profiles" style={{ color: '#fff' }}>Workers</Link>
            <Link to="/hackathons" style={{ color: '#fff' }}>Events</Link>
            <Link to="/about" style={{ color: '#fff' }}>About Us</Link>
            <Link to="/contact" style={{ color: '#fff' }}>Contact Us</Link>
          </div>
          <div className="right-data">
            {user ? (
              <div className='profile' style={{ display: 'flex' }}>

                <button onClick={onLogout}>Log Out</button>
              </div>
            ) : (
              <>
                <button> <Link to="/login"> Log In</Link></button>
                <button> <Link to="/register"> Register</Link></button>
              </>
            )}

          </div>

        </div>
      )}
      {showProfile && (
        <div className='profile-menu' onClick={closeProfile}>
          <div className="right-data" style={{ marginTop: '50px', marginBottom: '0px' }}>
            <button onClick={closeProfile} style={{ width: '80px', marginBottom: '0px' }}>close</button>
          </div>

          <h4>{user && user.name}</h4>
          <Link to="/profile" style={{ color: '#fff' }}>Profile View</Link>
          <button onClick={onLogout}>Log Out</button>
        </div>
      )}
    </section>
  )
}

export default Header
