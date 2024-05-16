import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux'
import { deletejob } from '../features/jobs/jobSlice';
import jobService from '../features/jobs/jobService';


const Dashboard = () => {

  // Move the declaration of 'navigate' here before using it in the useEffect
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  let { data: jobs, isLoading, isSuccess } = useQuery(
    'jobs', // The query key
    jobService.getjobs // Fetch function
  );


  const [loading, setLoading] = useState(null);
  const [title, setTitle] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);



  const handleDelete = async (e, id) => {
    setLoading(true);
    e.preventDefault();
    try {
      await dispatch(deletejob(id));
      toast("Job Deleted Successfully ...");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete!");
      console.log(error);
    }
    setLoading(false);
  }

  const handleSearch = (e) => {
    e.preventDefault();

    const regex = new RegExp(title, 'i'); // 'i' flag for case-insensitive matching
    const newJobs = jobs.filter((job) => regex.test(job?.title));

    if (newJobs.length === 0) {
      toast("Zero Results");
    }
    setFilteredJobs(newJobs);
  };



  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>


      <div class="heading" style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Job Listings</h2>
        <div className='form-group' style={{ padding: '10px' }}>
            {user && (
              <Link to="/post-jobs">
                <button
                  className="btn "
                  style={{
                    backgroundColor: '#2b82c4',
                    color: '#FFF'
                  }}
                >
                  Post jobs
                </button>

              </Link>
            )}
          </div>
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

      {filteredJobs.length > 0 && (
        <div class="main-container">
          <div class="left-side">

          </div>

          <div class="cards">
            {filteredJobs
              .sort((a, b) => new Date(b?.date) - new Date(a?.date))
              .map((job) => (
                <div className="card3" key={job?.id} style={{ height: '500px' }}>
                  {user && user.userType == "admin" && (
                    <button onClick={(e) => handleDelete(e, job?.id)} style={{ color: 'red', background: '#e0ffff', width: '30px', borderRadius: '50px', fontSize: '20px', position: 'fixed' }}><i class="fa-solid fa-trash-can"></i></button>
                  )}
                  <div className="card3-image">
                    <img src={job.imageFile} alt="" />
                  </div>
                  <div className="card3-details">
                    <p className="card3-title">{job?.title}</p>
                    <p className="card3-body">{job?.introduction.length > 70 ? job?.introduction.slice(0, 70) + '...' : job?.introduction}</p>

                    <h4>
                      Posted on:{" "}
                      <span>
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date(job?.date))}
                      </span>
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Link to={`/more-details/${job?.id}/job`}>
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
                      <a href={`mailto: ${job?.email}`}><button className="card3-btn">
                        Apply Now
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
                      </button></a>

                    </div>
                  </div>
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
        {jobs?.length > 0 && (
          <div class="cards">
            {jobs
              .sort((a, b) => new Date(b?.date) - new Date(a?.date))
              .map((job) => (
                <div className="card3" key={job?.id} style={{ height: '500px' }}>
                  {loading ? (
                    <h3 style={{color: '#fff'}}>deleting ...</h3>
                  ) : (
                    <>
                      {user && user.userType == "admin" && (
                        <button onClick={(e) => handleDelete(e, job?.id)} style={{ color: 'red', background: '#e0ffff', width: '30px', borderRadius: '50px', fontSize: '20px', position: 'fixed' }}><i class="fa-solid fa-trash-can"></i></button>
                      )}
                    </>
                  )}

                  <div className="card3-image">
                    <img src={job.imageFile} alt="" />
                  </div>
                  <div className="card3-details">
                    <p className="card3-title">{job?.title}</p>
                    <p className="card3-body">{job?.introduction.length > 70 ? job?.introduction.slice(0, 70) + '...' : job?.introduction}</p>

                    <h4>
                      Posted on:{" "}
                      <span>
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date(job?.date))}
                      </span>
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Link to={`/more-details/${job?.id}/job`}>
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
                      <a href={`mailto: ${job?.email}`}><button className="card3-btn">
                        Apply Now
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
                      </button></a>

                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        <div class="right-side">

        </div>
      </div>
    </div >
  );

};

export default React.memo(Dashboard);
