import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import Spinner from '../Spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';

const MemberTable = () => {
    // console.log(refetch)
    const [getmember, setGetmember] = useState([])
    const [memberdetails, setMemberDetails] = useState([])
    const [updateViewmemberdetails, setUpdateViewMemberDetails] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const { user } = useContext(AuthContext)

    const getUser = () => {
        axios.get(`http://localhost:8000/api/member/${user.email}`, {  //TODO: change with liver server;
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                setGetmember(res.data)
                setLoaded(true)
                // console.log(res.data)

            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getUser()
    }, [])

    // View Details of user;
    const handleViewDetails = (id) => {
        axios.get(`http://localhost:8000/api/member-id/${id}`, {  //TODO: change with liver server;
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                res.data.map(member => {
                    setMemberDetails(member)
                    // console.log(member)
                })

            })
            .catch(err => {
                console.log(err)
            })
    }

    // View Details of user;
    const handleUpdateViewDetails = (id) => {
        axios.get(`http://localhost:8000/api/member-id/${id}`, {  //TODO: change with liver server;
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                res.data.map(member => {
                    setUpdateViewMemberDetails(member)
                    // console.log(member)
                })

            })
            .catch(err => {
                console.log(err)
            })
    }


    // Update Member Details;
    const handleUpdateMember = (e) => {
        e.preventDefault();
        const form = e.target;
        const id = form.id.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const updateInfo = {
            name,
            email,
            phone,
        }

        // update-> sent to the server;
        axios.put(`http://localhost:8000/api/update-member/${id}`, updateInfo)  //TODO:change with live site;
            .then(res => {
                if (res.data.status == 'ok') {
                    getUser();
                    toast.success('User updated Successfully');
                    form.reset()
                }
            })
            .catch(err => {
                console.log(err)
            })

    }


    // HandleDelete Member;
    const handleDeleteMember = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                // update-> sent to the server;
                axios.delete(`http://localhost:8000/api/delete-member/${id}`)  //TODO: change with live site;
                    .then(res => {
                        if (res.data.status == 'ok') {
                            getUser();
                            Swal.fire(
                                'Deleted!',
                                'Member has been deleted.',
                                'success'
                            )
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
    }



    return (
        <div className='flex  justify-center'>
            {
                !isLoaded ?
                    <>
                        <div className="py-16">
                            <Spinner />
                        </div>
                    </>
                    :
                    <>
                        {
                            getmember.length > 0 ?
                                <>
                                    <div className="overflow-x-auto">
                                    <h3 className='text-center font-semibold py-2 text-2xl'>Member List</h3>
                                    <hr />
                                        <table className="table">
                                            {/* head */}
                                            <thead>
                                                <tr className='text-center'>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th colSpan={3}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* row 1 */}
                                                {
                                                    getmember.map((member, index) => <React.Fragment key={index}>
                                                        <tr>
                                                            <th>{member.id}</th>
                                                            <td>{member.name}</td>
                                                            <td>
                                                                <div className='md:flex'>
                                                                    <Link onClick={() => document.getElementById('my_modal_3').showModal()}><button className='btn btn-active mr-2 mb-2' onClick={() => handleViewDetails(member.id)}>View</button></Link>
                                                                    <Link onClick={() => document.getElementById('my_modal_4').showModal()}><button className='btn btn-info mr-2' onClick={() => handleUpdateViewDetails(member.id)}>Edit</button></Link>
                                                                    <Link><button className='btn btn-error w-16 md:w-full' onClick={() => handleDeleteMember(member.id)}>X</button></Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                                :
                                <>
                                    <div>
                                        <h3 className='text-2xl font-semibold font-serif text-red-600 py-16'>No member hasbeen Found..!</h3>
                                    </div>
                                </>
                        }

                    </>
            }


            {/* Modal 01 Viewing for Member Details; */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Member Details!</h3>
                    <div className='space-y-2'>
                        <div>
                            <h3 className='py-2'><span className='font-bold'>Name:</span> {memberdetails.name}</h3>
                            <hr />
                        </div>
                        <div>
                            <h3 className='py-2'><span className='font-bold'>Email:</span> <a className='link-primary underline' href={`mailto:${memberdetails.email}`}>{memberdetails.email}</a></h3>
                            <hr />
                        </div>
                        <div>
                            <h3 className='py-2'><span className='font-bold'>Phone:</span><a href={`tel:${memberdetails.phone}`}> {memberdetails.phone}</a></h3>
                            <hr />
                        </div>
                    </div>
                </div>
            </dialog>


            {/* Modal 02 Viewing for Member Details; */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-3">Update your Member Info</h3>
                    <hr />
                    <div className='space-y-2'>
                        <form onSubmit={handleUpdateMember}>
                            {/* Id hidden */}
                            <input type="text" name='id' value={updateViewmemberdetails.id} placeholder="Enter Member Name" className="input input-bordered " hidden />

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Enter Member Name" className="input input-bordered " />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="Enter your email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input type="number" name='phone' placeholder="+88016XXXXXXXX" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <button className='btn btn-neutral mt-4' type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>




            <ToastContainer />


        </div>
    );
}

export default MemberTable;
