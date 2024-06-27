import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addjob } from '../features/jobs/jobSlice';
import { subscribe } from '../features/subscriptions/subscriptionSlice';
import Spinner from '../components/Spinner'
import { useNavigate, Link } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'

import '../newStyles.css'
import app from '../firebase';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


import '../css/bootstrap.css'
import '../css/responsive.css'
import '../css/style.css'

function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');


    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    const handleImageChange = (e) => {
        setCoverPhoto(URL.createObjectURL(e.target.files[0]));
        setImageFile(e.target.files[0]);

    };

    const handleDescriptionChange = (value) => {

        setDescription(value); // Update the state with the new content
    };

    const handleJobSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!user) {
            toast("Please login to continue");
            navigate('/login');
            return
        }
        try {
            if (!imageFile) {
                toast.error("Please upload image ...");
                return
            }

            const storage = getStorage(app);
            const storageRef = ref(storage, 'images/' + imageFile.name);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log(snapshot);
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(storageRef);

                    const formData = {
                        imageFile: downloadURL,
                        title: title,
                        email: email,
                        description: description,
                        introduction: introduction,
                        user_id: user.id
                    }

                    await dispatch(addjob(formData));
                    toast.success("Job Posted Successfully");
                }
            );

        } catch (error) {
            toast.error("Failed to Post !");
            console.log(error);
        }
        setLoading(false);
        // Now you can dispatch your API call with the formData
    }

    const handleSubscribe = async (e) => {
        e.preventDefault();
        const newEmail = {
            email: email
        }
        await dispatch(subscribe(newEmail));
        alert("Subscribed successfully ..")
    }

    const onLogout = async () => {
        await dispatch(logout());
        await dispatch(reset());
        navigate('/')
    }

    return (
        <>
            <div class="hero_area">
                {/* <!-- header section strats --> */}
                <header class="header_section">
                    <div class="container">
                        <nav class="navbar navbar-expand-lg custom_nav-container pt-3">
                            <div className="navbar-brand" style={{ marginLeft: '20px' }}>
                                <a href="#">
                                    <img src="img/logo.png" alt="Kunakazi" width="50px" />
                                </a>
                            </div>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <div class="d-flex ml-auto flex-column flex-lg-row align-items-center">
                                    <ul class="navbar-nav  ">
                                        <li class="nav-item active">
                                            <Link class="nav-link" to="/">Home
                                                <span class="sr-only">(current)</span>
                                            </Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link to="/profiles" class="nav-link">
                                                Profiles
                                            </Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link to="/jobs" class="nav-link">
                                                Jobs
                                            </Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link to="/hackathons" class="nav-link">Events</Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link to="/about" class="nav-link" >About Us</Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link to="/contact" class="nav-link" >Contact Us</Link>
                                        </li>
                                    </ul>
                                    {/* <form class="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
                                        <button class="btn  my-2 my-sm-0 nav_search-btn" type="submit"></button>
                                    </form> */}
                                </div>
                                <div class="quote_btn-container ml-0 ml-lg-4 d-flex justify-content-center">
                                    {user ? (
                                            <a href="" onClick={onLogout}>Log Out</a>
                                    ) : (
                                        <Link to="/register">
                                            Get Started
                                        </Link>)}
                                </div>
                            </div>
                        </nav>
                    </div>
                </header>
                {/* <!-- end header section -->
                <!-- slider section --> */}
                <section class=" slider_section ">
                    <div class="container">
                        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <div class="slider_container">
                                        <div class="box">
                                            <div class="detail-box">
                                                <h1>
                                                    Kunakazi
                                                </h1>
                                                <h2>
                                                    A
                                                    Hub
                                                    for casual workers, jobs and events.
                                                </h2>
                                            </div>
                                            <div class="img-box">
                                                <div class="play_btn">
                                                    <Link to="/login">
                                                        <img src="img/login.png" alt="Log In" width="50px" />
                                                    </Link>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="btn-box">
                                            <Link to="/profiles">
                                                View Profiles
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >

                {/* < !--end slider section-- > */}
            </div >

            {/* < !--trip section-- > */}

            <section class="trip_section layout_padding" id="bookTrip">
                <div class="container">
                    <div class="heading_container">
                        <h2>Ready to Find Your Perfect Candidate?</h2>
                        <p>Post your job openings on our platform and connect with top talent.</p>
                    </div>

                </div>
                <div class="container ">
                    <div class="box container-bg">
                        <div class="img-box">
                            <img src="images/postjob.png" alt="" />
                        </div>
                        <div class="form_container">
                            <form class="form-new" style={{ width: '100%' }}>
                                {coverPhoto && <img src={coverPhoto} alt="Uploaded Image" width="300px" />}
                                <span class="sub mb">Upload cover image</span>
                                <input
                                    id="file-new"
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                <label class="avatar-new" for="file-new" ><span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M17.1813 16.3254L15.3771 14.5213C16.5036 13.5082 17.379 12.9869 18.2001 12.8846C19.0101 12.7837 19.8249 13.0848 20.8482 13.8687C20.8935 13.9034 20.947 13.9202 21 13.9202V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V13.7522C3.06398 13.7522 3.12796 13.7278 3.17678 13.679L4.45336 12.4024C5.31928 11.5365 6.04969 10.8993 6.71002 10.4791C7.3679 10.0605 7.94297 9.86572 8.50225 9.86572C9.06154 9.86572 9.6366 10.0605 10.2945 10.4791C10.9548 10.8993 11.6852 11.5365 12.5511 12.4024L16.8277 16.679C16.9254 16.7766 17.0836 16.7766 17.1813 16.679C17.2789 16.5813 17.2789 16.423 17.1813 16.3254Z" opacity="0.1"></path> <path stroke-width="2" stroke="#ffffff" d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"></path> <path stroke-linecap="round" stroke-width="2" stroke="#ffffff" d="M17.0045 16.5022L12.7279 12.2256C9.24808 8.74578 7.75642 8.74578 4.27658 12.2256L3 13.5022"></path> <path stroke-linecap="round" stroke-width="2" stroke="#ffffff" d="M21.0002 13.6702C18.907 12.0667 17.478 12.2919 15.1982 14.3459"></path> <path stroke-width="2" stroke="#ffffff" d="M17 8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8Z"></path> </g></svg></span></label>


                            </form>
                            <form onSubmit={handleJobSubmit} method="POST" enctype="multipart/form-data">



                                <label htmlFor="title">Job Title</label>
                                <input
                                    type="text"
                                    class="input-new"
                                    placeholder="Job Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />


                                <label htmlFor="email">Application Email</label>
                                <input
                                    type="email"
                                    class="input-new"
                                    placeholder="Application email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <label htmlFor="introduction">Introduction</label>
                                <textarea
                                    type=""
                                    class="input-new"
                                    value={introduction}
                                    onChange={(e) => setIntroduction(e.target.value)}
                                >
                                </textarea>

                                <label htmlFor="description">More Description</label>
                                <div className='editor'>
                                    <ReactQuill
                                        value={description}
                                        placeholder="Write the Description here ( For images and Links Just Paste)"
                                        onChange={handleDescriptionChange}
                                        className='editor'
                                    />
                                </div>


                                <div class="btn-box">
                                    {loading ? (
                                        <button disabled="disabled" style={{ marginTop: '100px' }}>Posting...</button>
                                    ) : (
                                        <button style={{ marginTop: '100px' }}>Submit</button>
                                    )}
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!--end trip section-- > */}


            {/* < !--package section-- > */}

            <section class="package_section" id="package">
                <div class="container">
                    <div class="heading_container">
                        <h2>Explore Our Packages</h2>
                        <p>Post jobs and events effortlessly with our customizable packages!</p>
                    </div>
                </div>


                <div class="container">
                    <div class="box container-bg">
                        <div class="img-box">
                            <img src="images/package-img.png" alt="" />
                        </div>
                        <div class="detail-container">
                            <div class="detail-box">
                                <h4 style={{ color: 'black' }}>
                                    Post Jobs
                                </h4>
                                <h2>
                                    <span></span>Free
                                </h2>
                                <ul>
                                    <li>
                                        Reach a wide audience of potential candidates.
                                    </li>
                                    <li>
                                        Easily manage and update your job postings.
                                    </li>
                                    <li>
                                        Connect with top talent in your industry.
                                    </li>
                                    <li>
                                        No hidden fees or charges.
                                    </li>
                                </ul>
                                <Link to="/post-jobs">
                                    Post Now
                                </Link>
                            </div>
                            <div class="detail-box">
                                <h4 style={{ color: 'black' }}>
                                    Post Events
                                </h4>
                                <h2>
                                    <span></span>Free
                                </h2>
                                <ul>
                                    <li>
                                        Promote your events to a targeted audience.
                                    </li>
                                    <li>
                                        Increase attendance and engagement for your events.
                                    </li>
                                    <li>
                                        No fees, no hassle, just easy event posting.
                                    </li>
                                </ul>
                                <Link to="/post-events">
                                    Post Now
                                </Link>
                            </div>
                        </div>

                        <div class="btn-box">
                            <Link to="/profiles" style={{ textAlign: 'center' }}>
                                Explore Casual Worker Profiles
                            </Link>

                        </div>
                    </div>
                </div>
            </section>
            {/* 
            <!--end package section-- >

            < !--service section-- > */}

            <section class="service_section layout_padding" id="service">
                <div class="container">
                    <div class="heading_container">
                        <h2>Discover Our Services</h2>
                        <p>Explore casual worker profiles, job postings and event listings, we're here to help you succeed.</p>
                    </div>

                </div>
                <div class="container">
                    <div class="box container-bg">
                        <div class="detail-box">
                            <div class="img-box">

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" /></svg>
                            </div>
                            <div class="text-box">
                                <h6>
                                    Casual worker profiles
                                </h6>
                                <p>
                                    Enhance your profile with your contact information, preferences for casual jobs, and desired professional roles.
                                </p>
                            </div>
                        </div>
                        <div class="detail-box">
                            <div class="img-box">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" /></svg>
                            </div>
                            <div class="text-box">
                                <h6>
                                    Job Opportunities
                                </h6>
                                <p>
                                    Explore job opportunities in any industry. We connect talented individuals with innovative companies
                                    seeking skilled professionals.
                                </p>
                            </div>
                        </div>
                        <div class="detail-box">
                            <div class="img-box">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M0 24C0 10.7 10.7 0 24 0H616c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 48 0 37.3 0 24zM0 488c0-13.3 10.7-24 24-24H616c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM83.2 160a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM32 320c0-35.3 28.7-64 64-64h96c12.2 0 23.7 3.4 33.4 9.4c-37.2 15.1-65.6 47.2-75.8 86.6H64c-17.7 0-32-14.3-32-32zm461.6 32c-10.3-40.1-39.6-72.6-77.7-87.4c9.4-5.5 20.4-8.6 32.1-8.6h96c35.3 0 64 28.7 64 64c0 17.7-14.3 32-32 32H493.6zM391.2 290.4c32.1 7.4 58.1 30.9 68.9 61.6c3.5 10 5.5 20.8 5.5 32c0 17.7-14.3 32-32 32h-224c-17.7 0-32-14.3-32-32c0-11.2 1.9-22 5.5-32c10.5-29.7 35.3-52.8 66.1-60.9c7.8-2.1 16-3.1 24.5-3.1h96c7.4 0 14.7 .8 21.6 2.4zm44-130.4a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM321.6 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" /></svg>
                            </div>
                            <div class="text-box">
                                <h6>
                                    Participate in Events
                                </h6>
                                <p>
                                    Join exciting events to engage with communities, explore new ideas, and contribute to innovative solutions for real-world challenges.

                                </p>
                            </div>
                        </div>
                        <div class="btn-box">
                            <Link to="/about">
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* 
                        <!-- end service section -->

                        <!-- blog section --> */}

            <section class="blog_section" id="blog">
                <div class="container">
                    <div class="heading_container">
                        <h2>
                            Common casual jobs
                        </h2>
                        <p>Explore a variety of casual job profiles in our platform.</p>
                    </div>
                </div>
                <div class="container">
                    <div class="box container-bg">
                        <div class="blog_box">

                            <div class="detail-box">
                                <div class="img-box">
                                    <img src="images/plumber.jpg" alt="" />
                                </div>
                                <div class="text-box">
                                    <h5>
                                        Plumbing
                                    </h5>
                                    <h6>
                                        Repair and Installation Services
                                    </h6>
                                    <p>
                                        Hire experienced plumbers for all your repair and installation needs.
                                    </p>
                                </div>
                            </div>
                            <Link to="/profiles">
                                View Profile
                            </Link>
                        </div>
                        <div class="blog_box-cover">
                            <div class="blog_box">

                                <div class="detail-box">
                                    <div class="img-box">
                                        <img src="images/laundry.jpg" alt="" />
                                    </div>
                                    <div class="text-box">
                                        <h5>
                                            Laundry
                                        </h5>
                                        <h6>
                                            Professional Laundry Services
                                        </h6>
                                        <p>
                                            Get your clothes cleaned and ironed by experienced professionals.
                                        </p>
                                    </div>
                                </div>
                                <Link to="/profiles">
                                    View Profile
                                </Link>
                            </div>
                            <div class="blog_box">

                                <div class="detail-box">
                                    <div class="img-box">
                                        <img src="images/housecleaning.jpeg" alt="" />
                                    </div>
                                    <div class="text-box">
                                        <h5>
                                            House Cleaning
                                        </h5>
                                        <h6>
                                            Professional Cleaning Services
                                        </h6>
                                        <p>
                                            Let professionals take care of your house cleaning needs.
                                        </p>
                                    </div>
                                </div>
                                <Link to="/profiles">
                                    View Profile
                                </Link>
                            </div>
                        </div>
                        <div class="blog_box">

                            <div class="detail-box">
                                <div class="img-box">
                                    <img src="images/tutor.png" alt="" />
                                </div>
                                <div class="text-box">
                                    <h5>
                                        Private Tutor
                                    </h5>
                                    <h6>
                                        Academic Tutoring Services
                                    </h6>
                                    <p>
                                        Get personalized tutoring to excel in your academic pursuits.
                                    </p>
                                </div>
                            </div>
                            <Link to="/profiles">
                                View Profile
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* <!-- end blog section -->

       

                        <!-- info section --> */}

            <section class="info_section">
                <div class="container">
                    {/* <div class="heading_container">
                        <h2>
                            Contact Us
                        </h2>
                        <p>
                            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                        </p>
                    </div> */}
                </div>
                <div class="info_container">
                    <div class="container">
                        <div class="social_container">
                            <img src="img/logo.png" alt="" width="100px" />
                            {/* <div class="info_social">
                                <div>
                                    <a href="#">
                                        <img src="images/facebook-logo-button.png" alt="" />
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                        <img src="images/twitter-logo-button.png" alt="" />
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                        <img src="images/linkedin.png" alt="" />
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                        <img src="images/instagram.png" alt="" />
                                    </a>
                                </div>
                            </div> */}
                        </div>
                        <div class="row" style={{ paddingTop: '20px', backgroundColor: '#fff', borderRadius: '70%' }}>
                            <div class="col-lg-4">
                                <h5>
                                    Subscribe Newsletter
                                </h5>
                                {/* <p>
                                    ncididunt ut labore et dolore magna
                                    minim veniam, quis nostrud
                                </p> */}
                                <form action="#">
                                    <input
                                        type="text"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div class="">
                                        <button onClick={handleSubscribe}>
                                            Subscribe
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div class=" col-lg-4">
                                <div class="info_nav_link">
                                    <h5>
                                        Useful link
                                    </h5>
                                    <ul>
                                        <li>
                                            <Link to="/">
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/profiles">
                                                Profiles
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/jobs">
                                                Jobs
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/hackathons">
                                                Events
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/about">
                                                About Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/contact">
                                                Contact Us
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-lg-4">
                                <h5>
                                    Address
                                </h5>
                                <div class="info_link-box">
                                    <a href="#">
                                        <img src="images/location2.png" alt="" />
                                        <span> Tudor, Mombasa. Near Technical University of Mombasa (TUM)</span>
                                    </a>
                                    <a href="#">
                                        <img src="images/call.png" alt="" />
                                        <span><a href="tel:+254795755494">Call : +254795755494</a></span>
                                    </a>
                                    <a href="#">
                                        <img src="images/mail.png" alt="" />
                                        <span> <a href="mailto:admin@kunakazi.co.ke">admin@kunakazi.co.ke</a></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- footer section --> */}
                        <section class=" footer_section">
                            <p>
                                Copyright &copy; 2023 All Rights Reserved
                                <a href="https://html.design/"> <br />
                                    <p>
                                        Product Developed By
                                        <a href="https://qualityasoftwares.com/"> Quality-A Softwares</a>
                                    </p></a>
                            </p>
                        </section>
                        {/* <!-- footer section --> */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
