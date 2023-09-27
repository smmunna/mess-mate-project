
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    const location = useLocation()
    // Getting the exact path;
    let from = location.state?.from?.pathname || "/";



    // Handle Logout;
    const handleLogout = () => {
        logOut()
            .then(() => {
                // Sign-out successful.
                navigate(from, { replace: true })
            }).catch((error) => {
                // An error happened.
            });
    }


    const navlink = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/notice">Notice</Link></li>
        {
            user ? <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <div className="block ml-4 py-4 md:hidden" >
                    <Link className="btn btn-warning" onClick={handleLogout} >Logout</Link>
                </div>
            </> : <></>
        }
    </>


    return (
        <div>

            <div className="px-0 lg:px-24 navbar bg-slate-700 text-slate-200">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className=" navlink menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-600 rounded-box w-52">
                            {navlink}
                        </ul>
                    </div>
                    <a className="normal-case text-xl font-serif">Mess Mate</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className=" navlink menu-horizontal px-1">
                        {navlink}
                    </ul>
                </div>

                <div className="navbar-end">
                    {
                        user ?
                            <>
                                <div className="flex justify-center items-center gap-3 mr-5 md:mr-4 lg:mr-0">
                                    <div className="w-12 rounded-full">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt="User Photo" />
                                        ) : (
                                            <div className="px-6">Loading...</div>
                                        )}
                                    </div>
                                    <div className="hidden md:block" onClick={handleLogout}>
                                        <Link className="btn btn-warning">Logout</Link>
                                    </div>
                                </div>

                            </>
                            :
                            <><Link to="/login" className="btn">Login</Link></>
                    }
                </div>
            </div>

        </div>
    );
}

export default Header;
