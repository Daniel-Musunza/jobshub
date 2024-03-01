import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
import { addhackathon, gethackathons, deletehackathon } from '../features/hackathons/hackathonSlice';

const Hackathons = () => {
  // Move the declaration of 'navigate' here before using it in the useEffect
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { hackathons, isLoading, isError, isSuccess, message } = useSelector((state) => state.hackathons);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);


  
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(gethackathons());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const handleDescriptionChange = (value) => {

    setDescription(value); // Update the state with the new content
  };

  const handleHackathonSubmit = async (e) => {
    e.preventDefault();


    const formData = {
      title,
      introduction,
      description
    }
    dispatch(addhackathon(formData));

    toast("Hachathon Posted Successfully ...");
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    dispatch(deletehackathon(id));

    toast("hackathon Deleted Successfully ..");
    dispatch(gethackathons());
  }

  const handleSearch = (e) => {
    e.preventDefault();
  
    const regex = new RegExp(title, 'i'); // 'i' flag for case-insensitive matching
    const newEvents = hackathons.filter((event) => regex.test(event.title));
  
    if (newEvents.length === 0) {
      toast("Zero Results");
    }
    setFilteredEvents(newEvents);
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>

      {user && user.userType=="admin" && (

        <div className='post-jobs'>

          <section className='heading' >

            <h1>
              Post Event
            </h1>
          </section>
          <section className='form'>

            <form onSubmit={handleHackathonSubmit} method="POST" enctype="multipart/form-data">
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder="Event Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor="introduction">Short Intro</label>
                <textarea
                  className='form-control'
                  name="introduction"
                  id=""
                  rows="5"
                  placeholder='Short Intro'
                  value={introduction}
                  onChange={(e) => setIntroduction(e.target.value)}></textarea>
              </div>
              <div className='editor'>
                <ReactQuill
                  value={description}
                  placeholder="Write the Description here ( For images and Links Just Paste)"
                  onChange={handleDescriptionChange} // Use the callback to handle content changes
                  className='editor'
                />
              </div>
              <div className='form-group' style={{ marginTop: '50px' }}>
                <button
                  className='form-control'
                  id="submit"
                  type="submit">
                  Submit
                </button>
              </div>
            </form>
          </section>

        </div>
      )}
      <div class="heading" style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Events</h2>
        <form style={{ display: 'flex', flexWrap: 'wrap' }} onSubmit={handleSearch}>
          <div className='form-group' style={{ padding: '10px' }}>
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


          <div className='form-group' style={{ padding: '10px' }}>
            <button type="submit" className="btn " style={{ background: '#2b82c4' }}>
              Search
            </button>
          </div>
        </form>
      </div>
      {filteredEvents.length > 0 && (
      <div class="main-container">
        <div class="left-side">

        </div>
       
          <div class="cards">
          {filteredEvents
          // .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((hackathon) => (
            <div className="hackathon" key={hackathon.id}>
              {user && user.userType=="admin" && (
                <button onClick={(e) => handleDelete(e, hackathon.id)} style={{color: 'red', background: '#e0ffff', width: '30px', borderRadius: '50px', fontSize: '20px', zIndex: '999'}}><i class="fa-solid fa-trash-can"></i></button>
              )}
              <p className="card-title">{hackathon.title}</p>
              <p className="card-body">{hackathon.introduction}</p>
              <h4>
                Posted on:{" "}
                <span>
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  }).format(new Date(hackathon.date))}
                </span>
              </h4>
              <Link to={`/more-details/${hackathon.id}/hackathon`}>
                <button className="btn">
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
            </div>
          ))}

        </div>
      
        
        <div class="right-side">

        </div>
      </div>
        )}
      <div class="main-container">
        <div class="left-side">

        </div>
        {hackathons.length > 0 && (
          <div class="cards">
          {hackathons
          // .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((hackathon) => (
            <div className="hackathon" key={hackathon.id}>
              {user && user.userType=="admin" && (
                <button onClick={(e) => handleDelete(e, hackathon.id)} style={{color: 'red', background: '#e0ffff', width: '30px', borderRadius: '50px', fontSize: '20px', zIndex: '999'}}><i class="fa-solid fa-trash-can"></i></button>
              )}
              <p className="card-title">{hackathon.title}</p>
              <p className="card-body">{hackathon.introduction}</p>
              <h4>
                Posted on:{" "}
                <span>
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  }).format(new Date(hackathon.date))}
                </span>
              </h4>
              <Link to={`/more-details/${hackathon.id}/hackathon`}>
                <button className="btn">
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

export default Hackathons;
