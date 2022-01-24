import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axiosWithAuth from "../utils/axiosWithAuth";

const Logout = ()=> {
    const { push } = useHistory();

    useEffect(()=> {
        axiosWithAuth()
            .post('http://localhost:9000/api/logout')
            .then(res => {
                localStorage.removeItem('token');
                push('/login');
            });
    }, []);

    return(<div></div>);
}

export default Logout;