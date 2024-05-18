import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import authService from '../features/auth/authService';
import jobService from '../features/jobs/jobService';
import hackathonService from '../features/hackathons/hackathonService';

import Spinner from '../components/Spinner';

const MoreDetails = () => {

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('profiles');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const { data: profiles, isSuccess } = useQuery('users', authService.getUsers);

  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const { data: localjobs } = useQuery('jobs', jobService.getjobs);



  const [hackathons, setHackathons] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const { data: events } = useQuery('hackathons', hackathonService.gethackathons);


  useEffect(() => {
      setJobs(localjobs);
      setUsers(profiles);
      setHackathons(events);
  }, [profiles]);




  const { id, type } = useParams();
  const [item, setItem] = useState(null);

  const handleSetItem = async () => {
    try {
      let newItem;

      if (type == 'job') {
        newItem = jobs.find((job) => job.id == parseInt(id));
      } else if (type == 'hackathon') {
        newItem = hackathons.find((hackathon) => hackathon.id == parseInt(id));
      } else if (type == 'profile') {
        newItem = users.find((user) => user.id == parseInt(id));
      }

      setItem(newItem);
    } catch (error) {
      console.error('Error setting item:', error);
    }
  };

  useEffect(async () => {


    await handleSetItem();

  }, [handleSetItem]);

  function formatPhoneNumber(phoneNumber) {
    // Remove leading '0' or '254'
    let cleanedNumber = phoneNumber.replace(/^0+|^(254)/, '');

    // Prepend '+254' to the number if it doesn't start with '+'
    if (!cleanedNumber.startsWith('+')) {
      cleanedNumber = '+254' + cleanedNumber;
    }

    return cleanedNumber;
  }


  return (

    <div>


      <div class="heading">
        <h2>More Details</h2>
      </div>
      <div class="main-container m-container">
        <div class="left-side">

        </div>
        <div className="more-details-container">
          {item && (
            <>
              <h2>{item?.title}</h2>
              {item?.imageFile && (
                <img src={item.imageFile} alt={item?.title} />
              )}
              {item?.profileImage && (
                <img src={URL.createObjectURL(new Blob([new Uint8Array(item?.profileImage.data)], { type: 'image/jpeg', }))} alt=""
                  style={{
                    width: '100px',
                    height: '100px', // Ensure the height matches the width for a perfect circle
                    marginRight: '20px',
                    borderRadius: '50%', // Make it circular
                    cursor: 'pointer',
                    objectFit: 'cover', // Maintain aspect ratio and cover the entire area
                  }} />
              )}
              <h3>{item?.name}</h3>
              <p>{item?.location}</p>
              {item?.link && (
                <p>CV/LinkedIn/Portfolio Link: <a href={item?.link}>{item?.link}</a></p>
              )}


              {type == 'job' ? (
                <a href={`mailto: ${item?.email}`}><button className="card3-btn">
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
              ) : type == 'profile' ? (
                <div className='contact-detail'>
                  <a href={`tel: ${formatPhoneNumber(item?.phoneNumber)}`}>
                    <i class="fa-solid fa-phone"></i> {formatPhoneNumber(item?.phoneNumber)}
                  </a>
                  <a href={`https://api.whatsapp.com/send?phone=${formatPhoneNumber(item?.phoneNumber)}`}>
                    <i class="fa-brands fa-square-whatsapp"></i>
                  </a>
                </div>
              ) : (
                <></>
              )}

              {item?.casualJobs && (
                <>
                  <h4><span style={{ color: '#2b82c4' }}>Casual Jobs can do:</span>  <p>{item?.casualJobs}</p></h4>


                </>
              )}
              {item?.proffessionalJobs && (
                <>
                  <h4><span style={{ color: '#2b82c4' }}>Proffession: </span> <p>{item?.proffessionalJobs}</p></h4>

                </>
              )}
              <h4><span style={{ color: '#2b82c4' }}>About </span> </h4>
              <div>{item?.introduction} </div>
              <div dangerouslySetInnerHTML={{ __html: item?.description }} />
            </>
          )}
        </div>
        <div class="right-side">

        </div>
      </div>

    </div>
  );
};

export default MoreDetails;
