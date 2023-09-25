import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner';
import { AuthContext } from '../../../provider/AuthProvider';
import Swal from 'sweetalert2';

const ViewBalance = () => {
    const [getUser, setGetUser] = useState([]);
    const [isLoaded, setLoaded] = useState(false)
    const [id, setId] = useState([]);
    const { user } = useContext(AuthContext)

    const joinUser = () => {
        axios.get(`http://localhost:8000/api/show-balance/${user.email}`, {  //TODO: change with liver server;
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                setGetUser(res.data)
                setLoaded(true)

            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        joinUser()
    }, [])


    // Update Balance;
    const handleUpdateAmount = (e) => {
        e.preventDefault()
        const form = e.target;
        const amount = form.amount.value;
        const amountInfo = {
            amount
        }
        axios.put(`http://localhost:8000/api/update-balance/${id}`, amountInfo) //TODO: change with live server;
            .then(res => {
                if (res.data.status == 'ok') {
                    form.reset()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Amount has been updated successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                joinUser()
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div>
            <h3 className='text-center text-2xl font-semibold pb-3'>Balance Information For All Members</h3>
            <hr />

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
                            getUser.length > 0 ?
                                <div className='flex justify-center'>
                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            {/* head */}
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Amount</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* row 1 */}
                                                {
                                                    getUser.map((member, index) => <React.Fragment key={index}>
                                                        <tr>
                                                            <td>{member.name}</td>
                                                            <td>{member.amount} Taka</td>
                                                            <td>
                                                                <div>
                                                                    <Link onClick={() => document.getElementById('my_modal_4').showModal()}><button className='btn btn-info mr-2 leading-[1.5]' onClick={() => setId(member.id)}>Update Amount</button></Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                :
                                <>
                                    <div>
                                        <h3 className='text-2xl text-center font-semibold font-serif text-red-600 py-16'>Information Not Found..!</h3>
                                    </div>
                                </>
                        }
                    </>
            }

            {/* Modal 4 */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg py-2">Enter updated Amount</h3>
                    <hr />
                    <div className='mt-2'>
                        <form onSubmit={handleUpdateAmount}>
                            <div className="mb-2">
                                <input type="number" name='amount' placeholder="Enter amount" className="input input-bordered input-accent w-full" required />
                            </div>
                            <div className="mb-2">
                                <button type="submit" className='btn btn-neutral'>Update Amount</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
}

export default ViewBalance;
