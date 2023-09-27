import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../../../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment/moment';

const ManagerRequest = () => {
    const [reqlist, setReqlist] = useState([]);
    const [isLoaded, setLoaded] = useState(false)
    const [id, setId] = useState([]);
    const [getreq, setGetreq] = useState('');

    const getUser = () => {
        axios.get(`http://localhost:8000/api/managerlist`, { //TODO:change with live site;
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                setReqlist(res.data)
                setLoaded(true)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        getUser()
    }, [])

    // Update Status;
    const handleUpdateStatus = (e) => {
        e.preventDefault()
        const form = e.target;
        const updateInfo = {
            id,
            status: getreq
        }
        axios.put(`http://localhost:8000/api/req-status-update`, updateInfo) //TODO: change with live server;
            .then(res => {
                if (res.data.status == 'ok') {
                    form.reset()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Status updated.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                getUser();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>

            <h3 className='text-center text-2xl font-semibold pb-3'>Manager List Information</h3>
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
                            reqlist.length > 0 ?
                                <div className='flex justify-center'>
                                    <div className="w-80 md:w-full overflow-x-auto">
                                        <table className="table">
                                            {/* head */}
                                            <thead>
                                                <tr>
                                                    <th>SL</th>
                                                    <th>Email</th>
                                                    <th>Status</th>
                                                    <th>Mess Name</th>
                                                    <th>Req Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* row 1 */}
                                                {
                                                    reqlist.map((member, index) => <React.Fragment key={index}>
                                                        <tr className={`${(index+1)%2 == 0 ? 'bg-slate-200':''}`}>
                                                        <td>{index+1}</td>
                                                            <td><a href={`mailto:${member.email}`} className='link-primary underline'>{member.email}</a></td>
                                                            <td>
                                                                <Link onClick={() => setId(member.id)}><button className={`btn ${member.status == 'pending' ? 'btn-error' : 'btn-info'}`} onClick={() => { document.getElementById('my_modal_4').showModal() }}>{member.status}</button></Link>
                                                            </td>
                                                            <td>{member.mess_name}</td>
                                                            <td>{moment(member.created_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
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
                    <h3 className="font-bold text-lg py-2">Update status</h3>
                    <hr />
                    <div className='mt-2'>
                        <form onSubmit={handleUpdateStatus}>
                            <select className="select select-accent w-full" value={getreq} onChange={(e) => setGetreq(e.target.value)}>
                                <option >Choose one</option>
                                <option value={`pending`}>Pending</option>
                                <option value={`accept`}>Accept</option>
                            </select>
                            <div className="my-2">
                                <button type="submit" className='btn btn-neutral'>Update Status</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>



        </div>
    );
}

export default ManagerRequest;
