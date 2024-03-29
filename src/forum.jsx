
import Likes from "./likes";

import Fcomments from "./fcomments";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import "./forum.css"
import Chatbot from './Chatbot'; // Import the Chatbot component
import Footer from './Footer';

const Forum = () => {
    const baseURL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV;
    const createThread = () => {
        fetch(baseURL+"/api/create/thread", {
            method: "POST",
            body: JSON.stringify({
                thread,
                email:e,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
            setThreadList(data.threads);
        })
        .catch((err) => console.error(err));
    };
    const [thread, setThread] = useState("");
    const [threadList, setThreadList] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ thread });
        createThread();
        setThread("");
    };
    const navigate = useNavigate()
    
    const [e, setE] = useState("")
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const fetchData = async () => {
            try {
                //console.log(props.eventId)
                const res = await axios.get(baseURL+`/api/create/thread`);
                
                console.log("Response data:", res.data);
                const email = res.data;
                //console.log(email)
                setE(res.data.userEmail);
                fetch(baseURL+"/api/all/threads")
                .then((res) => res.json())
                .then((data) => setThreadList(data.threads))
                .catch((err) => console.error(err));
            } catch (error) {
                if (error.response) {

                    console.error("Server responded with non-success status", error.response.status);

                    if (error.response.status === 401) {
                        // Unauthorized, redirect to login
                        navigate('/login', { state: { message: 'Please login to proceed.' } });
                    } else {

                    }
                }
            }
        };

        fetchData();
    }, []);





    return (
        <>
            
            <main className='home'>
                <h2 className='homeTitle'>Create a Thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className='home__container'>
                        <label htmlFor='thread'>Title / Description</label>
                        <input
                            type='text'
                            name='thread'
                            required
                            value={thread}
                            onChange={(e) => setThread(e.target.value)}
                        />
                    </div>
                    <button className='homeBtn'>CREATE THREAD</button>
                </form>
                <div className='thread__container'>
                {threadList.map((thread) => (
                    <div className='thread__item' key={thread.id}>
                        <p>{thread.title}</p>
                        <div className='react__container'>
                            <Likes numberOfLikes={thread.likes.length} threadId={thread.id} />
                            <Fcomments numberOfComments={thread.replies.length} threadId={thread.id} title={thread.title} />
                        </div>
                    </div>
                ))}
            </div>
            </main>
            <Chatbot/> {/* Include the Chatbot component */}
            <Footer/> {/* Include the Footer component */}
        </>
    );
};

export default Forum;


