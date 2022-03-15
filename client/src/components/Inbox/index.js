import React, {useEffect} from 'react';
import { baseRequest } from '../../axiosCall';
const Inbox = () => {

    const currentUser = localStorage.getItem("userId");
    useEffect(()=>{
        const url = `get-inbox/${currentUser}`;
        baseRequest(url);
    },[])
    return <p>Inbox</p>

}

export default Inbox;