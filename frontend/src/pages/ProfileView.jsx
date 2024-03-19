import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux'
import { reset, updateUser } from '../features/auth/authSlice'

const ProfileView = () => {

  // Move the declaration of 'navigate' here before using it in the useEffect
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [location, setLocation] = useState(user?.location);
  const [description, setDescription] = useState(user?.description);
  const [casualJobs, setCasualJobs] = useState(user?.casualJobs);
  const [proffessionalJobs, setProffessionalJobs] = useState(user?.proffessionalJobs);
  const [imageFile, setImageFile] = useState(null);
  const [link, setLink] = useState(user?.link);

  useEffect(() => {
  

   if(!user){
    navigate('/');
   }
  }, [user, navigate, isError, message, dispatch]);

  const handleDescriptionChange = (value) => {

    setDescription(value); // Update the state with the new content
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('id', user.id);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('location', location);
      formData.append('userType', user.userType);
      formData.append('casualJobs', casualJobs);
      formData.append('proffessionalJobs', proffessionalJobs);
      formData.append('description', description);
      formData.append('imageFile', imageFile);
      formData.append('link', link);

      // Dispatch the API call and wait for it to complete
      await dispatch(updateUser(formData));

      // Display success message to the user
        toast("Profile Updated Successfully...");
    } catch (error) {
      // Handle errors, log them, or show an error message to the user
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile. Please try again.");
    }
  };



  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className='post-jobs'>

        <section className='heading' >

          <h1>
            Profile View
          </h1>
        </section>
        <section className='form'>

          {user.profileImage && (
            <img src={URL.createObjectURL(new Blob([new Uint8Array(user.profileImage.data)],{type: 'image/jpeg', }))} alt=""
              style={{
                width: '100px',
                height: '100px', // Ensure the height matches the width for a perfect circle
                marginRight: '20px',
                borderRadius: '50%', // Make it circular
                cursor: 'pointer',
                objectFit: 'cover', // Maintain aspect ratio and cover the entire area
              }} />
          )}

          <form onSubmit={handleUpdateProfile} method="POST" enctype="multipart/form-data">
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder="Your Phone Number eg (+254700000000)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder="Location You can work from"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder="List all Casual jobs you want to do"
                value={casualJobs}
                onChange={(e) => setCasualJobs(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder="Your Proffessionality"
                value={proffessionalJobs}
                onChange={(e) => setProffessionalJobs(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder="Link to your LinkedIn or Portfolio or CV"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="answerFile">Upload Profile Picture</label>

              <input
                className='form-control'
                name="image"
                id="image"
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])} // Use e.target.files to get the file object
              />
            </div>

            <div className='editor' style={{ marginBottom: '50px' }}>
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
    </div>
  );
};

export default ProfileView;
