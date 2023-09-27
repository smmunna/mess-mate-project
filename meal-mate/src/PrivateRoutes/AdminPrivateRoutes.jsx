import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Spinner from '../components/Spinner/Spinner';

const AdminPrivateRoutes = ({children}) => {
    const location = useLocation()
    const [reqUser, setReqUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${user?.email}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        }) //TODO: change with live site;
            .then(res => {
                setReqUser(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    if (loading) {
        return <>
            <Spinner />
        </>
    }

    if (reqUser.roles == 'admin') {
        return children;
    }

    return <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
}

export default AdminPrivateRoutes;
