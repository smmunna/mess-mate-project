import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import axios from 'axios';
import Spinner from '../../../components/Spinner/Spinner';
import PageTitle from '../../../components/PageTitle/PageTitle';
import userIcon from "../../../assets/icon/user.png";

const Profile = () => {
    const { user } = useContext(AuthContext)
    const [getUser, setUser] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(`https://messmateserver.techzaint.com/api/user/${user?.email}`, { //TODO: change with live site;
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

            <PageTitle title={`Profile | Mess Mate`} />

            <div className="mt-8 lg:mt-2 md:grid grid-cols-4 grid-rows-2 bg-white gap-2 p-4 rounded-xl">
                <div className="md:col-span-1 h-48 shadow-xl">
                    <div className="flex w-full h-full relative">
                        {
                            user ? <>
                                <img
                                    src={user?.photoURL}
                                    className="w-20 h-20 m-auto"
                                    alt=""
                                />
                            </>
                                :
                                <>
                                    <img
                                        src={userIcon}
                                        className="w-20 h-20 m-auto"
                                        alt=""
                                    />
                                </>
                        }
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
                            value={getUser.roles == 'pending' ? 'Pending' : getUser.roles == 'user' ? 'User' : getUser.roles == 'admin' ? 'Admin' : 'Manager'}
                            readOnly
                        />
                    </div>
                </div>
                {/* <div className="md:col-span-3 h-48 shadow-xl p-4 space-y-2 hidden md:block">
                    <h3 className="font-bold uppercase">Have any query ?</h3>
                    <p>
                        Contact with us: <a className='link-primary underline' href={`mailto:info@techzaint.com`}>info@techzaint.com</a>
                    </p>
                    <p>1. You can give the feedback for improvement.</p>
                    <p>2. Software is totally free for you.</p>
                </div> */}
            </div>


        </div>
    );
}

export default Profile;
