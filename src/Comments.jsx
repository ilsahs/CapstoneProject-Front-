import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
const Comments = (props) => {


    const [suc, setSuc] = useState()
    const navigate = useNavigate()
    const [e, setE] = useState([])
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchData = async () => {
            try {
                //console.log(props.eventId)
                const res = await axios.get(`http://localhost:3001/comments/` + props.eventId);
                setSuc("Successded OK");
                //console.log("Response data:", res.data);
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
    }, []);


    return (
        <div>
       
            <ul>

                {e[0] && e[0].Comments.map(element => (
                    <li key={element.user}>
                        <p><b>Name: {element.name}</b></p>
                        <p>Comment: {element.comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Comments;