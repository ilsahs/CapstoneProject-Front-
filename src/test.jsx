
import React from 'react'
import { useState } from "react";
import { Link, resolvePath, useNavigate } from "react-router-dom";
import axios from 'axios'


function Test() {
    const [Email, setEmail] = useState()
    const baseURL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV;
    const [Password, setPassword] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(baseURL+'/Test', {Email, Password})
        .then(res => {
            setEmail(res)
        }).catch(err => console.log(err))
    }

    return(
        <div>
            <input type='submit'></input>
            <h1>em  {Email}</h1>
            <p>test</p>
        </div>
        
    )
}

export default Test;
