import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'

function Dashboard() {
    const [suc, setSuc] = useState()
    const navigate = useNavigate()
    const [e, setE] = useState([])
    axios.defaults.withCredentials = true;


    // useEffect(() => {

    //     // const authToken = localStorage.getItem('token');

    //     // if (!authToken) {
    //     //     // Redirect to login page or handle unauthenticated user
    //     //     navigate('/login');
    //     //     return;
    //     // }

    //     axios.get('http://localhost:3001/dashboard')
    //         .then(res => {
    //             //console.log("dashboad: " + res.data);
    //             console.log("testtt")
    //             console.log(res)
    //             console.log("end testttttt")
    //             if(res.status == 401){
    //                 navigate('/login');
    //             }
    //             setSuc("Successded OK")
    //             setE(res.data)

    //         }).catch(err => console.log(err))
    // }, [])

    //     useEffect(() => {
    //         const fetchData = async () => {
    //             try {
    //                 const res = await axios.get('http://localhost:3001/dashboard');
    //                 console.log("testtt");
    //                 console.log(res);
    //                 console.log("end testttttt");



    //                 setSuc("Successded OK");
    //                 //setE(res.data);
    //             } catch (err) {
    //                 console.log("catch err start")
    //                 console.error(err);
    // console.log("catch err endddd")
    //                 console.log("in catch")
    //                 console.log("axxxx", err.AxiosError)
    //                 if (err.axios == 401) {
    //                     console.log("here inside")
    //                     navigate('/login');
    //                     return;
    //                 }
    //             }
    //         };

    //         fetchData();
    //     }, []);


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
                    <li key={element.id}>
                        <p><b>Title: {element.title}</b></p>
                        <p>date: {element.date}</p>
                        <p>Location: {element.location}</p>
                        <p>category: {element.category}</p>
                        <p>summary: {element.summary}</p>
                        <p>link: {element.link}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;