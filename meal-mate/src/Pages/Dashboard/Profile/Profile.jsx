import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import axios from 'axios';
import Spinner from '../../../components/Spinner/Spinner';

const Profile = () => {
    const { user } = useContext(AuthContext)
    const [getUser, setUser] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user-req-details/${user.email}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        }) //TODO: change with live site;
            .then(res => {
                setUser(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    if (loading) {
        return <div>
            <Spinner />
        </div>
    }

    return (
        <div>


            <div className="mt-8 lg:mt-2 md:grid grid-cols-4 grid-rows-2 bg-white gap-2 p-4 rounded-xl">
                <div className="md:col-span-1 h-48 shadow-xl">
                    <div className="flex w-full h-full relative">
                        <img
                            src={user?.photoURL}
                            className="w-44 h-44 m-auto"
                            alt=""
                        />
                    </div>
                </div>
                <div className="md:col-span-3 h-48 shadow-xl p-4 space-y-2 p-3">
                    <div className="flex">
                        <span className="text-sm border bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                            Name:
                        </span>
                        <input
                            className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                            type="text"
                            value={user?.displayName}
                            readOnly
                        />
                    </div>
                    <div className="flex">
                        <span className="text-sm border bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                            Email:
                        </span>
                        <input
                            className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                            type="text"
                            value={user?.email}
                            readOnly
                        />
                    </div>
                    <div className="flex">
                        <span className="text-sm border bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                            Role:
                        </span>
                        <input
                            className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                            type="text"
                            value={getUser.status == 'pending' ? 'Pending' : getUser.status == 'user' ? 'User' : 'Manager'}
                            readOnly
                        />
                    </div>
                </div>
                <div className="md:col-span-3 h-48 shadow-xl p-4 space-y-2 hidden md:block">
                    <h3 className="font-bold uppercase">Instructions:</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                        eget laoreet diam, id luctus lectus. Ut consectetur nisl ipsum, et
                        faucibus sem finibus vitae. Maecenas aliquam dolor at dignissim
                        commodo. Etiam a aliquam tellus, et suscipit dolor. Proin auctor
                        nisi velit, quis aliquet sapien viverra a.
                    </p>
                </div>
            </div>


        </div>
    );
}

export default Profile;
