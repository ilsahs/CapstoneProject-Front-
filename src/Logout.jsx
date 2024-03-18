import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
  useEffect(() => {
    axios.get('qatareventhub.vercel.app/logout')
    .then(res => {
        if(res.data.logout) {
            navigate('/')
        }
    }).catch(err => console.log(err))
  }, [])
}

export default Logout
