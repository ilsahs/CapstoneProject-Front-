import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
    const baseURL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV;
  useEffect(() => {
    axios.get(baseURL+'/logout')
    .then(res => {
        if(res.data.logout) {
            navigate('/')
        }
    }).catch(err => console.log(err))
  }, [])
}

export default Logout
