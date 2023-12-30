import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
import { addjob, getjobs } from '../features/jobs/jobSlice';

const Dashboard = () => {

  // Move the declaration of 'navigate' here before using it in the useEffect
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { jobs, isLoading, isError, isSuccess, message } = useSelector((state) => state.jobs);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setShowModal((prevShowModal) => !prevShowModal);
  };
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const handleDescriptionChange = (value) => {
   
    setDescription(value); // Update the state with the new content
  };
  const handleJobSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData(); // Create a FormData object


    formData.append('title', title); // Append the actual file here
    formData.append('description', description);
    formData.append('introduction', introduction);
    formData.append('imageFile', imageFile);

    console.log(formData); // Check the formData to verify that the file is appended correctly

    // Now you can dispatch your API call with the formData
    dispatch(addjob(formData));

    alert("Job Posted Successfully ...");
    setShowModal(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>

      {user && (

      <div className='post-jobs'>

        <section className='heading' >

          <h1>
            Post Job
          </h1>
        </section>
        <section className='form'>

          <form onSubmit={handleJobSubmit} method="POST" enctype="multipart/form-data">
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="answerFile">Upload Image</label>

              <input
                className='form-control'
                name="image"
                id="image"
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])} // Use e.target.files to get the file object
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
          
            <div className='form-group' style={{marginTop: '50px'}}>
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
      <div class="heading">
        <h2>Job Listings</h2>
      </div>

      <div class="main-container">
        <div class="left-side">

        </div>
        <div class="cards">
          <div class="card">
            <div class="card-image">
              <img src="img/job.jpg" alt="" />
            </div>
            <p class="card-title">Card title</p>
            <p class="card-body">
              Nullam ac tristique nulla, at convallis quam. Integer consectetur mi nec magna tristique, non lobortis.
            </p>
            <h4>Posted on: <span>0701/2024</span></h4>
            <Link to={`/more-details/${1}`}>
              <button class="btn">
                More Details
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15px" width="15px" class="icon">
                  <path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5" stroke="#292D32" d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>
        <div class="right-side">

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
