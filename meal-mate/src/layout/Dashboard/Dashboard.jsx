import { useContext, useEffect, useState } from "react";
import { Link, Outlet, ScrollRestoration } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [getUser, setUser] = useState([]);
    const [reqUser, setReqUser] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${user?.email}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        }) //TODO: change with live site;
            .then(res => {
                setUser(res.data)
                // console.log(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user-req-details/${user?.email}`, { //TODO: change with live server;
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                setReqUser(res.data)
                // console.log(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="dashboard">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Page content here */}
                    <div className="py-20 md:py-4 px-2">
                        <Outlet />
                        <ScrollRestoration />
                    </div>

                    <label htmlFor="my-drawer-2" className="btn btn-success drawer-button lg:hidden w-36 absolute top-2 right-2">
                        Open⏭
                    </label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="sidebar-menu menu p-4 w-80 min-h-full  text-base-content">

                        {
                            loading && <div className="text-white font-semibold text-lg text-center py-16">Wait a seconds, Loading.......</div>
                        }

                        {/* Sidebar content here */}

                        {/* For user */}
                        {
                            getUser.roles == 'user' && <>
                                <div>
                                    <h3 className="text-xl font-bold text-yellow-400 py-4">Welcome to <span>Dashboard</span></h3>
                                    <hr className="border-4 border-b-amber-600" />
                                    <li className="my-3 py-2 bg-slate-900"><Link className="link-style1">How to use ?</Link></li>
                                    <li className="my-3 py-2 bg-slate-800"><Link className="link-style1" to={`/dashboard/profile`}>Profile</Link></li>

                                    {
                                        reqUser.status == 'accept' && <>
                                            <div className="dropdown font-xl ">
                                                <label tabIndex={0} className="btn m-1 bg-orange-500 w-[280px]">Manager Activity</label>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-slate-800 rounded-box w-52">
                                                    <li className="mb-2"><Link className="link-style" to={`/dashboard/add-members`}>Add Member</Link></li>
                                                    <li className="mb-2"><Link className="link-style-brown" to={`/dashboard/view-members`}>View Member</Link></li>
                                                    <li className="mb-2"><Link className="link-style" to={`/dashboard/add-balance`}>Add Balance</Link></li>
                                                    <li className="mb-2"><Link className="link-style-brown" to={`/dashboard/view-balance`}>View Balance</Link></li>
                                                    <li className="mb-2"><Link className="link-style" to={`/dashboard/daily-cost`}>Add Daily Meal</Link></li>
                                                    <li className="mb-2"><Link className="link-style-brown" to={`/dashboard/view-meal-status`}>View Daily Meal</Link></li>
                                                    <li className="mb-2"><Link className="link-style" to={`/dashboard/daily-bazar`}>Add Daily Bazar</Link></li>
                                                    <li className="mb-2"><Link className="link-style-brown" to={`/dashboard/current-status`}>Current Status</Link></li>
                                                    <li className="mb-2"><Link className="link-style" to={`/dashboard/format-storage`}>Format Storage For starting New Month</Link></li>
                                                </ul>
                                            </div>

                                        </>
                                    }

                                    {
                                        (reqUser.status == 'pending') && <li className="my-3 py-2 bg-red-500"><Link to={`/dashboard/request-manager`}>Request for Manager</Link></li>
                                    }


                                    <li className="my-3 py-2 bg-slate-700"><Link to={`/contact`} className="link-style1">Contact with Admin</Link></li>
                                </div>
                            </>
                        }

                        {/* For Admin */}
                        {
                            getUser.roles == 'admin' && <>
                                <div>
                                    <h3 className="text-lg font-bold text-red-600 py-4">Welcome to <span>User Pannel</span></h3>
                                    <hr className="border-4 border-b-amber-600" />
                                    <li className="my-3 py-2 bg-slate-800"><Link className="link-style-brown" to={`/dashboard/profile`}>Profile</Link></li>
                                    <li className="my-3 py-2 bg-slate-700"><Link className="link-style" to={`/dashboard/req-manager-list`}>Request for Manager List</Link></li>
                                    {/* <li className="my-3 py-2 bg-slate-800"><Link className="link-style-brown">Messages</Link></li> */}
                                </div>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;
