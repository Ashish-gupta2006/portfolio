import React from 'react'
import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const ProtectRoute = () => {
    const[loading, setLoding] = useState(true);
    const[authentication, setAuthenication] = useState(false)
    const verify = async()=>{
        try {
            const response = await axios.get(`${BACKEND_URL}/varify-token`,{
                withCredentials:true,
            });
            
            console.log(response);
        } catch (error) {
            setLoding(false)

        }finally{
            setLoding(false);
        }
    }

    useEffect(()=>{
        verify();
    },[])
  return (
    <div></div>
  )
}

export default ProtectRoute

