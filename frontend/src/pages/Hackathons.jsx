import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
import { addhackathon, deletehackathon } from '../features/hackathons/hackathonSlice';
import hackathonService from '../features/hackathons/hackathonService';
const Hackathons = () => {
  // Move the declaration of 'navigate' here before using it in the useEffect
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: hackathons, isLoading, isSuccess } = useQuery(
    'hackathons', // The query key
    hackathonService.gethackathons // Fetch function
  );
  const [filteredEvents, setFilteredEvents] = useState([]);


  const handleDelete = async (e, id) => {
    setLoading(true)
    e.preventDefault();
    try {
      await dispatch(deletehackathon(id));
      toast.success("Event Deleted Successfully ...");
    } catch (error) {
      toast.error("Failed to Delete !");
      console.log(error);
    }
    setLoading(false)
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
    <div >

      <div class="heading" style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Events</h2>
        {user && (
            <div className='form-group' style={{ padding: '10px' }}>
              <Link to="/post-events">
                <button
                  className="btn "
                  style={{
                    backgroundColor: '#2b82c4',
                    color: '#FFF'
                  }}
                >
                  Post events
                </button>

              </Link>
            </div>
          )}
          
        <form style={{ display: 'flex', flexWrap: 'wrap' }} onSubmit={handleSearch}>

         

          <div className='form-group' style={{ padding: '10px' }}>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              placeholder='Filter by Event title'
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
              .sort((a, b) => new Date(b?.date) - new Date(a?.date))
              .map((hackathon) => (
                <div className="hackathon" key={hackathon?.id}>
                  {user && user.userType == "admin" && (
                    <button onClick={(e) => handleDelete(e, hackathon?.id)} style={{ color: 'red', background: '#e0ffff', width: '30px', borderRadius: '50px', fontSize: '20px', zIndex: '999' }}><i class="fa-solid fa-trash-can"></i></button>
                  )}
                  <p className="card3-title">{hackathon?.title}</p>
                  <p className="card3-body">{hackathon?.introduction.length > 150 ? hackathon?.introduction.slice(0, 150) + '...' : hackathon?.introduction}</p>
                  <h4>
                    Posted on:{" "}
                    <span>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      }).format(new Date(hackathon?.date))}
                    </span>
                  </h4>
                  <Link to={`/more-details/${hackathon?.id}/hackathon`}>
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
                </div>
              ))}

          </div>


          <div class="right-side">

          </div>
        </div>
      )}
      <div class="main-container m-container">
        <div class="left-side">

        </div>
        {hackathons?.length > 0 && (
          <div class="cards">
            {hackathons
              .sort((a, b) => new Date(b?.date) - new Date(a?.date))
              .map((hackathon) => (
                <div className="hackathon" key={hackathon?.id}>
                   {loading ? (
                    <h3 style={{color: '#fff'}}>deleting ...</h3>
                  ) : (
                    <>
                  {user && user.userType == "admin" && (
                    
                    <button onClick={(e) => handleDelete(e, hackathon?.id)} style={{ color: 'red', background: '#e0ffff', width: '30px', borderRadius: '50px', fontSize: '20px', zIndex: '999' }}><i class="fa-solid fa-trash-can"></i></button>
                  )}
                  </>)}
                  <p className="card3-title">{hackathon?.title}</p>
                  <p className="card3-body">{hackathon?.introduction.length > 150 ? hackathon?.introduction.slice(0, 150) + '...' : hackathon?.introduction}</p>

                  <h4>
                    Posted on:{" "}
                    <span>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      }).format(new Date(hackathon?.date))}
                    </span>
                  </h4>
                  <Link to={`/more-details/${hackathon?.id}/hackathon`}>
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
