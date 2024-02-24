
import React from 'react'
import { useState } from "react";
import { Link, resolvePath, useNavigate } from "react-router-dom";
import axios from 'axios'


function Test() {
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/Test', {Email, Password})
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