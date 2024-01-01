import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../features/auth/authSlice';
import { getjobs } from '../features/jobs/jobSlice';
import { gethackathons } from '../features/hackathons/hackathonSlice';
import { getblogs } from '../features/blogs/blogSlice';

const MoreDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobs);
  const { hackathons } = useSelector((state) => state.hackathons);
  const { blogs } = useSelector((state) => state.blogs);
  const { id, type } = useParams();
  const [item, setItem] = useState(null);

  const handleSetItem = async () => {
    try {
      let newItem;

      if (type == 'job') {
        newItem = jobs.find((job) => job.id == parseInt(id));
      } else if (type == 'hackathon') {
        newItem = hackathons.find((hackathon) => hackathon.id == parseInt(id));
      } else if (type == 'blog') {
        newItem = blogs.find((blog) => blog.id == parseInt(id));
      }

      setItem(newItem);
    } catch (error) {
      console.error('Error setting item:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getblogs());
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
              { item.imageFile && (
                <img src={`/uploads/${item.imageFile}`} alt={item.title} />
              )}
              
              <div>{item.introduction}</div>
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
