import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, Link } from 'react-router-dom'

import { addhackathon } from '../features/hackathons/hackathonSlice';


import '../newStyles.css'

function PostEvents() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [loading, setLoading] = useState(false);

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )


    const handleDescriptionChange = (value) => {

        setDescription(value); // Update the state with the new content
    };

    const handleHackathonSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        const formData = {
            title,
            introduction,
            description,
            user_id: user.id
        }

        try {
            await dispatch(addhackathon(formData));

            toast.success("Event Posted Successfully ...");
        } catch (error) {
            toast.error("Failed to Post !")
            console.log(error);
        }
        setLoading(false)



    };

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
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
            <form class="form-new form" onSubmit={handleHackathonSubmit} method="POST" enctype="multipart/form-data" >
                <span class="title-new">Post Events</span>
                <label htmlFor="title">Event Title</label>
                <input
                    type="text"
                    class="input-new"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                ) : (
                    <button class="button-new" style={{ marginTop: '100px' }}>Submit</button>
                )}


            </form>

        </div>

    )
}

export default PostEvents
