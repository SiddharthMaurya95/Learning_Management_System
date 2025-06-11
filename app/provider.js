"use client"
import React, { useEffect } from 'react'
import {useUser} from '@clerk/nextjs'
import { USER_TABLE } from '@/configs/schema';
import {db} from '@/configs/db'
import { eq } from 'drizzle-orm';
import axios from 'axios';
function Provider({children}) {
    const {user}=useUser();
    useEffect(()=>{
        user&&CheckIsNewUser(); 
    },[user]);
    const CheckIsNewUser=async()=>{
        const resp=await axios.post('/api/create-user',{user:user});
        console.log(resp.data);
    }
    
  return (
    <div>{children}</div>
  )
}

export default Provider