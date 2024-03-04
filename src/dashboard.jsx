import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import Comments from "./Comments";

function Dashboard() {
    const [suc, setSuc] = useState()
    const navigate = useNavigate()
    const [e, setE] = useState([])
    axios.defaults.withCredentials = true;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3001/dashboard');
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
    }, []);


    return (
        <div>
            <h2>Logout: </h2>
            <Link to="/logout" className='navbar-link'>Logout</Link>
            <h2>Events</h2>
            <ul>
                {e.map(element => (
                    <div key={element.id}>
                    <li>
                
                        <p><b>Title: {element.title}</b></p>
                        <p>date: {element.date}</p>
                        <p>time: {element.time}</p>
                        <p>Location: {element.location}</p>
                        <p>category: {element.category}</p>
                        <p>summary: {element.summary}</p>
                        <p>link: {element.link}</p>
                        <img src={element.image} height="150px"></img>
                    </li>
                    <p>Comments:</p>
                    <Comments eventId={element._id} />
                </div>
                   
                ))
                
                }
            </ul>
        </div>
    );
}

export default Dashboard;