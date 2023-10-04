import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import PageTitle from "../../../components/PageTitle/PageTitle";
import { ToastContainer, toast } from 'react-toastify';

const AddBalance = () => {
    const [getmember, setGetmember] = useState([])
    const { user } = useContext(AuthContext)
    const [changeMember, setChangeMember] = useState('');

    const getUser = () => {
        axios.get(`http://localhost:8000/api/member/${user.email}`, {  //TODO: change with liver server;
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {

                setGetmember(res.data)

            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getUser()
    }, [])

    // Add amount to this form;
    const handleAddAmount = (e) => {
        e.preventDefault();
        const form = e.target;
        const member_id = JSON.parse(changeMember).member_id;
        const name = JSON.parse(changeMember).name;
        const amount = form.amount.value;

        const amountInfo = {
            member_id,
            name,
            amount,
            manager_email: user.email,
        }
        // console.log(amountInfo)

        // Add data to the server Balance Controller with Balance table;
        axios.post(`http://localhost:8000/api/add-balance`, amountInfo) //TODO: change with live server;
            .then(res => {
                if (res.data.status == 'exist') {
                    toast.error('Sorry! your have already added balance !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                else if (res.data.status == 'ok') {
                    toast.success('Balance hasbeen added successfully..', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    form.reset()
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <PageTitle title={`Add Balance | Mess Mate`} />
            <h3 className='text-2xl text-center mb-2 font-semibold'>Add Balance</h3>
            <hr />
            <div className='grid justify-center pt-5'>
                <div>
                    <form onSubmit={handleAddAmount}>
                        <div className='mb-2'>
                            <select className="select select-accent w-full lg:w-[300px]" defaultValue={changeMember} onChange={(e) => setChangeMember(e.target.value)}>
                                <option>Choose Member Name</option>
                                {getmember.map((member, index) => (
                                    <option key={index + 1} value={JSON.stringify({ member_id: member.id, name: member.name })}>
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2">
                            <input type="number" name='amount' placeholder="Enter amount" className="input input-bordered input-accent w-full" required />
                        </div>
                        <div className="mb-2">
                            <button type="submit" className='btn btn-neutral'>Add Amount</button>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default AddBalance;
