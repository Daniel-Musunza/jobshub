import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
import { addmessage, getmessages } from '../features/messages/messageSlice';
import Spinner from '../components/Spinner';
const Contact = () => {

  // Move the declaration of 'navigate' here before using it in the useEffect
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { messages, isLoading, isError, isSuccess, message } = useSelector((state) => state.messages);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userMessage, setMessage] = useState('');

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getmessages())
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: email,
      name: name,
      message: userMessage
    }

    dispatch(addmessage(formData));
    alert("Message Send Successfully");
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      {user && (
        <div>
          <div class="heading">
            <h2>Messages</h2>
          </div>
          <div class="main-container">
            <div class="left-side">

            </div>
            {messages.length > 0 && (
              <div class="cards">
                {messages
                  // .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((onemessage) => (
                    <div className="hackathon" key={onemessage.id}>

                      <p className="card-title">{onemessage.name}</p>
                      <p className="card-body">{onemessage.message}</p>
                      <h4>
                        <span>
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          }).format(new Date(onemessage.date))}
                        </span>
                      </h4>

                    </div>
                  ))}

              </div>
            )}

            <div class="right-side">

            </div>
          </div>
        </div>
      )}

      <div class="heading">
        <h2>Contact Us</h2>
      </div>
      <div class="main-container m-container">
        <div class="left-side">

        </div>
        <div className="contact-us">
          <div className="contact-form">
          <p>Have questions or feedback? Reach out to us!</p>
          {/* <h3 className="team">Our Team</h3> */}
            <div className="team">
          
              <div className="team-member">
                <img src="img/profile.jpg" alt=""
                  style={{
                    width: '100px',
                    height: '100px', // Ensure the height matches the width for a perfect circle
                    marginRight: '20px',
                    borderRadius: '50%', // Make it circular
                    cursor: 'pointer',
                    objectFit: 'cover', // Maintain aspect ratio and cover the entire area
                  }} />
                <h3>Musunza Festus</h3>
                <h5>C.E.O | software engineer </h5>
                <a href="tel: +254795755494"><i class="fa-solid fa-phone"></i> +254795755494</a>
              </div>
              <div className="team-member">
                <img src="img/jesse.jfif" alt=""
                  style={{
                    width: '100px',
                    height: '100px', // Ensure the height matches the width for a perfect circle
                    marginRight: '20px',
                    borderRadius: '50%', // Make it circular
                    cursor: 'pointer',
                    objectFit: 'cover', // Maintain aspect ratio and cover the entire area
                  }} />
                <h3>Jesse Mutembei</h3>
                <h5>C.O.O (Jobs and Profiles)</h5>
                <a href="tel: +254714006882"> <i class="fa-solid fa-phone"></i> +254714006882</a>
              </div>
              <div className="team-member">
                <img src="img/izo.enc" alt=""
                  style={{
                    width: '100px',
                    height: '100px', // Ensure the height matches the width for a perfect circle
                    marginRight: '20px',
                    borderRadius: '50%', // Make it circular
                    cursor: 'pointer',
                    objectFit: 'cover', // Maintain aspect ratio and cover the entire area
                  }} />
                <h3>Isaac Musau </h3>
                <h5>C.M.O (Marketing and Events)</h5>
                <a href="tel: +254714494787"><i class="fa-solid fa-phone"></i> +254714494787</a>
              </div>
            </div>

          
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Your Name:</label>
              <input type="text" id="name" name="name" placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="email">Your Email:</label>
              <input type="email" id="email" name="email" placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="message">Your Message:</label>
              <textarea id="message" name="message" placeholder="Type your message here"
                value={userMessage}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <button type="submit">Send Message</button>
            </form>

            <div className="social-links">
              <h3>Connect with Us:</h3>
              <ul>
                <li>
                  <a href="https://www.facebook.com/Kunakazi" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/Kunakazi" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/Kunakazi" target="_blank" rel="noopener noreferrer">
                   LinkedIn
                  </a>
                </li>
                <li>
                  <strong>WhatsApp:</strong>{' '}
                  <a href="https://api.whatsapp.com/send?phone=254795755494" target="_blank" rel="noopener noreferrer">
                    +254 795 755 494
                  </a>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
        <div class="right-side">

        </div>
      </div>
    </div>
  );
};

export default Contact;
