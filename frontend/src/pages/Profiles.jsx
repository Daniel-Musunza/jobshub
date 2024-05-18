import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux';

import authService from '../features/auth/authService';

const Profiles = () => {

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('profiles');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const { data: profiles, isSuccess } = useQuery('users', authService.getUsers);

  useEffect(() => {
    if (isSuccess && profiles && profiles.length > 0) {
      setUsers(profiles);// Save fetched users to localStorage
    }
  }, [profiles, isSuccess]);



  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [filteredProfiles, setProfiles] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    let filteredProfiles = users;

    if (title && location) {
      const titleRegex = new RegExp(title, 'i');
      const locationRegex = new RegExp(location, 'i');

      filteredProfiles = users.filter((user) => titleRegex.test(user.casualJobs) && locationRegex.test(user.location));
    } else if (title) {
      const titleRegex = new RegExp(title, 'i');
      filteredProfiles = users.filter((user) => titleRegex.test(user.casualJobs));
    } else if (location) {
      const locationRegex = new RegExp(location, 'i');
      filteredProfiles = users.filter((user) => locationRegex.test(user.location));
    }

    if (filteredProfiles.length === 0) {
      toast("Zero Results");
    }
    setProfiles(filteredProfiles);
  };

  function formatPhoneNumber(phoneNumber) {
    // Remove leading '0' or '254'
    let cleanedNumber = phoneNumber.replace(/^0+|^(254)/, '');

    // Prepend '+254' to the number if it doesn't start with '+'
    if (!cleanedNumber.startsWith('+')) {
      cleanedNumber = '+254' + cleanedNumber;
    }

    return cleanedNumber;
  }

  let fixedArr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

  return (
    <div>

      <div class="heading" style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Profiles</h2>
        <form style={{ display: 'flex', flexWrap: 'wrap' }} onSubmit={handleSearch}>
          <div className='form-group profile-input' style={{ padding: '10px' }}>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              placeholder='Filter by Job title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='form-group profile-input' style={{ padding: '10px' }}>
            <input
              type='text'
              className='form-control'
              id='location'
              name='location'
              placeholder='Filter by Location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className='form-group profile-button' style={{ padding: '10px' }}>
            <button type="submit" className="btn" style={{ background: '#2b82c4' }}>
              Search
            </button>
          </div>
        </form>

      </div>
      {filteredProfiles.length > 0 && (
        <div class="main-container">
          <div class="left-side">

          </div>
          <div class="cards">
            {filteredProfiles
              .map((blog) => (
                <div className="blog" key={blog?.id}>

                  {/* <div className="card-image">
                    <img src={URL.createObjectURL(new Blob([new Uint8Array(blog?.profileImage.data)],{type: 'image/jpeg', }))} alt="Profile Image"
                      style={{
                        width: '100%',
                        height: '250px',
                        cursor: 'pointer',
                        objectFit: 'cover', // Maintain aspect ratio and cover the entire area
                      }} />
                  </div> */}
                  <div className="card3-details">
                    <div className="blog-title">
                      <p className="card3-title">{blog?.name}</p>
                      <p className="card3-body">{blog?.location}</p>
                    </div>

                    <hr />
                    <p className="card3-title">Casual Services:</p>
                    <p className="card3-body">{blog?.casualJobs.length > 70 ? blog?.casualJobs.slice(0, 70) + '...' : blog?.casualJobs}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Link to={`/more-details/${blog?.id}/profile`}>
                        <button className="card3-btn">
                          More Details
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            height="15px"
                            width="15px"
                            className="icon"
                          >
                            <path
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              strokeWidth="1.5"
                              stroke="#292D32"
                              d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
                            ></path>
                          </svg>
                        </button>
                      </Link>
                      <div className='contact-detail'>
                        <a href={`tel: ${formatPhoneNumber(blog?.phoneNumber)}`}>
                          <i class="fa-solid fa-phone"></i> {formatPhoneNumber(blog?.phoneNumber)}
                        </a>
                        <a href={`https://api.whatsapp.com/send?phone=${formatPhoneNumber(blog?.phoneNumber)}`}>
                          <i class="fa-brands fa-square-whatsapp"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}


          </div>

          <div class="right-side">

          </div>
        </div>
      )}
      {users?.length < 1 && (
        <>
          <h3 style={{ textAlign: 'center', color: '#fff' }}>loading...</h3>
          <div class="main-container m-container">
            <div class="left-side">

            </div>
            <div className="cards">
              {fixedArr.map((item, index) => ( // Added parentheses around JSX expression
                <div className="blog" key={index}> {/* Changed style border value */}

                </div>
              ))}
            </div>



            <div class="right-side">

            </div>

          </div>
        </>
      )}

      <div class="main-container m-container">
        <div class="left-side">

        </div>
        {users?.length > 0 && (
          <div class="cards">
            {users
              .map((blog) => (
                <div className="blog" key={blog?.id}>

                  {/* <div className="card-image">
                    <img src={URL.createObjectURL(new Blob([new Uint8Array(blog?.profileImage.data)],{type: 'image/jpeg', }))} alt="Profile Image"
                       />
                  </div> */}
                  <div className="card3-details">
                    <div className="blog-title">
                      <p className="card3-title">{blog?.name}</p>
                      <p className="card3-body">{blog?.location}</p>
                    </div>
                    <hr />
                    <p className="card3-title">Casual Services:</p>
                    <p className="card3-body">{blog?.casualJobs.length > 70 ? blog?.casualJobs.slice(0, 70) + '...' : blog?.casualJobs}</p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                      <Link to={`/more-details/${blog?.id}/profile`}>
                        <button className="card3-btn">
                          More Details
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            height="15px"
                            width="15px"
                            className="icon"
                          >
                            <path
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              strokeWidth="1.5"
                              stroke="#292D32"
                              d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
                            ></path>
                          </svg>
                        </button>
                      </Link>
                      <div className='contact-detail'>
                        <a href={`tel: ${formatPhoneNumber(blog?.phoneNumber)}`}>
                          <i class="fa-solid fa-phone"></i> {formatPhoneNumber(blog?.phoneNumber)}
                        </a>
                        <a href={`https://api.whatsapp.com/send?phone=${formatPhoneNumber(blog?.phoneNumber)}`}>
                          <i class="fa-brands fa-square-whatsapp"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}


          </div>
        )}

        <div class="right-side">

        </div>

      </div>

    </div>
  );
};

export default Profiles;
