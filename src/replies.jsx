import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
const Replies = () => {
    const baseURL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV;
    const [replyList, setReplyList] = useState([]);
    const [reply, setReply] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [e, setE] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(baseURL+`/api/create/reply`);
                setE(res.data.userEmail)
            } catch (error) {
                if (error.response) {
                    console.error("Server responded with non-success status", error.response.status);
                    if (error.response.status === 401) {
                        navigate('/login', { state: { message: 'Please login to proceed.' } });
                    } else {
                    }}}};
        fetchData();
    }, []);

    useEffect(() => {
        const fetchReplies = () => {
            fetch(baseURL+"/api/thread/replies", {
                method: "POST",
                body: JSON.stringify({
                    id,
                    
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setReplyList(data.replies);
                    setTitle(data.title);
                })
                .catch((err) => console.error(err));
        };
        fetchReplies();
    }, [id]);

    const addReply = () => {
        fetch(baseURL+"/api/create/reply", {
            method: "POST",
            body: JSON.stringify({
                id,
                email: e,
                reply,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                navigate("/forum");
            })
            .catch((err) => console.error(err));
    };
    
    const handleSubmitReply = (e) => {
        e.preventDefault();
        addReply();
        setReply("");
    };
    return (
        <main className='replies'>
            <h1 className='repliesTitle'>{title}</h1>
    
            <form className='replyForm' onSubmit={handleSubmitReply}>
                <label htmlFor='reply' className='replyLabel'>Reply to the thread</label>
                <textarea
                    id='reply'
                    rows={5}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    name='reply'
                    className='replyInput'
                    placeholder='Type your reply here...'
                />
                <button type='submit' className='replyBtn'>SEND</button>
            </form>
    
            <div className='replyContainer'>
                {replyList.map((replyItem, index) => (
                    <div className='replyItem' key={index}>
                        <p className='replyText'>{replyItem.text}</p>
                        <p className='replyMeta'>by {replyItem.name}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
export default Replies;
