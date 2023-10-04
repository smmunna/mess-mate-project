import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { Link } from 'react-router-dom';
import PageTitle from "../../../components/PageTitle/PageTitle";
import Swal from 'sweetalert2';

const AddMember = () => {
    const { user } = useContext(AuthContext);
    const [reqUser, setReqUser] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user-req-details/${user.email}`, { //TODO: change with live server
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        }) //TODO: change with live site;
            .then(res => {
                setReqUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const handleAddMember = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const mess_name = reqUser.mess_name;
        const manager_email = user.email;

        if (name.length < 3) {
            alert('Name must be atleast 3 character long')
            return
        }
        // else if (phone.length < 10) {
        //     alert('Phone Number must be atleast 10 digit')
        //     return
        // }

        const addInfo = {
            name,
            email,
            phone,
            mess_name,
            manager_email
        }

        // console.log(addInfo)
        // Send data to server;

        axios.post(`http://localhost:8000/api/add-member`, addInfo)  //TODO: change with live server
            .then(res => {
                if (res.data.status == 'ok') {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Member added successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    form.reset();
                }
            })
            .catch(err => {
                console.log(err)
            })

    }





    return (
        <div>
            <PageTitle title={`Add Member | Mess Mate`} />
            <div className='flex justify-center'>
                <div>
                    <div>
                        <h3 className='text-2xl font-semibold'>Group ID: <span className='text-amber-600 mb-2'>{reqUser.mess_name}</span></h3>
                        <hr className='my-2' />

                    </div>

                    <div>
                        <form onSubmit={handleAddMember}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Enter Member Name" className="input input-bordered lg:w-[400px] " required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="Enter your email, optional" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input type="number" name='phone' placeholder="+88016XXXXXXXX, optional" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <button className='btn btn-neutral mt-4' type="submit">Save</button>
                            </div>

                        </form>
                    </div>



                </div>
            </div>

            <div className='mt-4'>
                <div className='mb-8'>
                    <hr />
                </div>
                <h3 className='text-center font-bold text-lg'><Link className="link-primary underline" to={`/dashboard/view-members`}>View Members</Link></h3>
                <div className='mt-8'>
                    <hr />
                </div>
                {/* Current Status; */}

            </div>
        </div>
    );
}

export default AddMember;
