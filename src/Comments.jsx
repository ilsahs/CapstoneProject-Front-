import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
const Comments = (props) => {


    const [suc, setSuc] = useState()
    const navigate = useNavigate()
    const [e, setE] = useState([])
    axios.defaults.withCredentials = true;
    const [newComment, setNewComment] = useState()
    const [eventID, seteventID] = useState(props.eventId)
    const baseURL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV;
    const [email, setemail] = useState(props.email)
    useEffect(() => {
        const fetchData = async () => {
            try {
                //console.log(props.eventId)
                const res = await axios.get(baseURL+`/comments/` + props.eventId);
                setSuc("Successded OK");
                setE(res.data);
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
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(baseURL+'/comments', {eventID, newComment, email })
        .then(res => {
            console.log("posted");
        }).catch(err => console.log(err))
    }

    return (
        <div>
       
            <ul>

                {e[0] && e[0].Comments.map(element => (
                    <li key={element.user}>
                        <p><b>{element.name}</b></p>
                        <p>{element.comment}</p>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Write a comment!"
                  autoComplete="off"
                  name="comment"
                  className="input rounded"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div><br/>
              <button type="submit" className="button w-100 rounded">Post</button>
              </form>
        </div>
    );
}

export default Comments;
