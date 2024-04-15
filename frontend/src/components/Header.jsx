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

  const onLogout = async () => {
    await dispatch(logout());
    await dispatch(reset());
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
          <img src="img/logo.png" alt="" width="80px" />
        </a>
      </div>
      <i className="fi fi-br-menu-burger" style={{ color: '#fff', fontSize: '40px', marginRight: '20px' }} onClick={toggleMenu}></i>


      <nav>
        <div className="navbar" style={{ background: 'black', alignItems: 'center', justifyContent: 'center' }}>
          <Link to="/" style={{ color: '#fff' }}>Profiles</Link>
          <Link to="/jobs" style={{ color: '#fff' }}>Jobs</Link>
          <Link to="/hackathons" style={{ color: '#fff' }}>Events</Link>
          <Link to="/about" style={{ color: '#fff' }}>About Us</Link>
          <Link to="/contact" style={{ color: '#fff' }}>Contact Us</Link>
        </div>

        <div className="right-data">
          {user ? (
            <div className='profile' style={{ display: 'flex' }} onClick={toggleProfile}>
              {user.profileImage ? (
                <img
                  src={URL.createObjectURL(new Blob([new Uint8Array(user.profileImage.data)], { type: 'image/jpeg', }))}
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
            <div style={{ display: 'flex' }}>

              <Link to="/login" className='link button' style={{ zIndex: 1000 }}> <span> Log In</span></Link>
              <Link to="/register" className='link button' style={{ marginLeft: '-30px' }}><span style={{ marginLeft: '30px' }}>  Register</span></Link>
            </div>
          )}

        </div>
      </nav>
      {showMenu && (
        <div className='mobile-nav' onClick={closeMenu}>
          <div className="right-data" style={{ marginBottom: '0px' }}  >
            <button onClick={closeMenu} style={{ width: '80px', marginBottom: '0px' }} className='button'>close</button>
          </div>

          <div className="navbar" style={{ background: 'black', alignItems: 'center', justifyContent: 'center' }}>
            {user && (
              <>
                {user.profileImage ? (
                  <img
                    src={URL.createObjectURL(
                      new Blob([new Uint8Array(user.profileImage.data)], {
                        type: 'image/jpeg',
                      })
                    )}
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
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      marginRight: '20px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      backgroundColor: '#ccc',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '24px',
                    }}
                  >
                    {user && user.name && user.name.charAt(0)}
                  </div>
                )}
                <h4>{user && user.name}</h4>

                <Link to="/profile" style={{ color: '#fff' }}>Profile View</Link>
              </>
            )}
            <Link to="/" style={{ color: '#fff' }}>Profiles</Link>
            <Link to="/jobs" style={{ color: '#fff' }}>Jobs</Link>
            <Link to="/hackathons" style={{ color: '#fff' }}>Events</Link>
            <Link to="/about" style={{ color: '#fff' }}>About Us</Link>
            <Link to="/contact" style={{ color: '#fff' }}>Contact Us</Link>

            <div className="right-data">
              {user ? (
                <div className='profile' style={{ display: 'flex' }}>

                  <button onClick={onLogout} className='button'>Log Out</button>
                </div>
              ) : (
                <>

                  <Link to="/login" className='link button' > <span> Log In</span></Link>
                  <Link to="/register" className='link button' style={{ marginTop: '10px' }}><span >  Register</span></Link>
                </>
              )}

            </div>
          </div>
        </div>
      )}
      {showProfile && (
        <div className='profile-menu' onClick={closeProfile}>
          <div className="right-data" style={{ marginBottom: '0px' }}>
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
