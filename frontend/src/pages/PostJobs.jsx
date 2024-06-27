import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addjob } from '../features/jobs/jobSlice';
import Spinner from '../components/Spinner'
import { useNavigate, Link } from 'react-router-dom'


import '../newStyles.css'
import app from '../firebase';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


function PostJobs() {
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
                    toast.success("Job Posted Successfully" );
                }
            );

        } catch (error) {
            toast.error("Failed to Post !");
            console.log(error);
        }
        setLoading(false);
        // Now you can dispatch your API call with the formData
    }


    useEffect(() => {


        if (!user) {
            toast("Please Log in")
            navigate('/login');
        }

    }, [user, navigate])
    // if (loading) {
    //     return <Spinner />
    // }
    return (
        <div style={{  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
            <form class="form-new form" onSubmit={handleJobSubmit} method="POST" enctype="multipart/form-data" >
                <span class="title-new">Post jobs</span>
                {coverPhoto && <img src={coverPhoto} alt="Uploaded Image" />}
                <span class="sub mb">Upload cover image</span>
                <input
                    id="file-new"
                    type="file"
                    onChange={handleImageChange}
                />
                <label class="avatar-new" for="file-new" ><span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M17.1813 16.3254L15.3771 14.5213C16.5036 13.5082 17.379 12.9869 18.2001 12.8846C19.0101 12.7837 19.8249 13.0848 20.8482 13.8687C20.8935 13.9034 20.947 13.9202 21 13.9202V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V13.7522C3.06398 13.7522 3.12796 13.7278 3.17678 13.679L4.45336 12.4024C5.31928 11.5365 6.04969 10.8993 6.71002 10.4791C7.3679 10.0605 7.94297 9.86572 8.50225 9.86572C9.06154 9.86572 9.6366 10.0605 10.2945 10.4791C10.9548 10.8993 11.6852 11.5365 12.5511 12.4024L16.8277 16.679C16.9254 16.7766 17.0836 16.7766 17.1813 16.679C17.2789 16.5813 17.2789 16.423 17.1813 16.3254Z" opacity="0.1"></path> <path stroke-width="2" stroke="#ffffff" d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"></path> <path stroke-linecap="round" stroke-width="2" stroke="#ffffff" d="M17.0045 16.5022L12.7279 12.2256C9.24808 8.74578 7.75642 8.74578 4.27658 12.2256L3 13.5022"></path> <path stroke-linecap="round" stroke-width="2" stroke="#ffffff" d="M21.0002 13.6702C18.907 12.0667 17.478 12.2919 15.1982 14.3459"></path> <path stroke-width="2" stroke="#ffffff" d="M17 8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8Z"></path> </g></svg></span></label>
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
                {loading ? (
                    <button class="button-new" disabled="disabled" style={{ marginTop: '100px' }}>Posting...</button>
                ):(
                    <button class="button-new" style={{ marginTop: '100px' }}>Submit</button>
                )}
                
             
            </form>

        </div>

    )
}

export default PostJobs
