import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Users from './Users';
import { baseUrl } from '../../common/constants';
import { io } from "socket.io-client";

export default function Dashboar() {
    const redirect = useNavigate();
    const [user, setInfo] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const socket = io(baseUrl);

    useEffect(()=>{
        getInfo();
    },[]);

    const getInfo = async () => {
        const loggedIn = await axios.get(`${baseUrl}get-info`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        if(loggedIn.data.valid === false){
            redirect('/')
        }else{
            setInfo(loggedIn.data.info);
            console.log(loggedIn.data.info._id);
            const allUsers = await axios.get(`${baseUrl}all-users`, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            setAllUsers(allUsers.data);
        }

    }
    return (
        <div>
            <h1>Hello {user?.name} your account status is {user?.isAdmin ? "Admin" : "not admin"}</h1>
            <Users allUsers={allUsers}/>
        </div>
    )
}
