import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset, fetchUsers } from '../features/auth/authSlice';
import { getjobs } from '../features/jobs/jobSlice';
import { gethackathons } from '../features/hackathons/hackathonSlice';

const MoreDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobs);
  const { hackathons } = useSelector((state) => state.hackathons);
  const { users } = useSelector((state) => state.users);
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

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers());
      await dispatch(gethackathons());
      await dispatch(getjobs());
      await handleSetItem();
    };

    fetchData();
  }, [dispatch, id, type]);


  return (
    <div>
      <div class="heading">
        <h2>More Details</h2>
      </div>
      <div class="main-container">
        <div class="left-side">

        </div>
        <div className="more-details-container">
          {item && (
            <>
              <h2>{item.title}</h2>
              {item.imageFile && (
                <img src={`/uploads/${item.imageFile}`} alt={item.title} />
              )}
              {item.profileImage && (
                <img src={`/uploads/${item.profileImage}`} alt="" 
                style={{
                  width: '100px',
                  height: '100px', // Ensure the height matches the width for a perfect circle
                  marginRight: '20px',
                  borderRadius: '50%', // Make it circular
                  cursor: 'pointer',
                  objectFit: 'cover', // Maintain aspect ratio and cover the entire area
                }} />
              )}
              <h3>{item.name}</h3>
              <p>{item.location}</p>


              {type == 'job' ? (
                <a href={`mailto: ${item.email}`}><button className="btn">
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
                  <a href={`tel: ${item.phoneNumber}`}>
                    <i class="fa-solid fa-phone"></i> {item.phoneNumber}
                  </a>
                  <a href={`https://api.whatsapp.com/send?phone=${item.phoneNumber}`}>
                    <i class="fa-brands fa-square-whatsapp"></i>
                  </a>
                </div>
              ) : (
                <></>
              )}

              {item.casualJobs && (
                <>
                  <h4>Casual Jobs can do:</h4>
                  <hr />
                  <p>{item.casualJobs}</p>

                </>
              )}
              {item.proffessionalJobs && (
                <>
                  <h4>Proffessionality</h4>
                  <hr />
                  <p>{item.proffessionalJobs}</p>
                </>
              )}
              <div>{item.introduction} </div>
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
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
