import React, { useContext, useEffect, useState } from 'react';
import showIcon from "../../../assets/icon/date.png";
import { AuthContext } from '../../../provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import Spinner from '../../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import PageTitle from "../../../components/PageTitle/PageTitle"

const DailyBazar = () => {
    const [startdate, setStartDate] = useState('');
    const [bazardata, setBazarData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [id, setId] = useState([]);
    const { user } = useContext(AuthContext)


     //Show the daily Bazar cost here;
     const getBazarCost = () => {
        axios.get(`http://localhost:8000/api/show-daily-bazar?manager_email=${user?.email}`, { //TODO: change with live server;
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                setBazarData(res.data)
                setLoaded(true)
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getBazarCost()
    }, [])



    // handle save bazar cost;
    const handleSaveData = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const cost = form.amount.value;

        const bazarInfo = {
            name,
            cost,
            date: startdate,
            manager_email: user.email
        }
        // console.log(bazarInfo)
        axios.post(`http://localhost:8000/api/save-dailybazar`, bazarInfo)  //TODO: change with live server;
            .then(res => {
                if(res.data.status == 'exist'){
                    alert(`On this date: ${startdate}, data already exist..!`)
                    return
                }
                if (res.data.status == 'ok') {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Daily Bazar cost added successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    form.reset()
                    getBazarCost()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

   

    // Update the bazar cost;
    const handleUpdateBazarAmount = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const amount = form.amount.value;
        const amountInfo = {
            name,
            amount
        }

        axios.put(`http://localhost:8000/api/update-dailybazar?id=${id}`, amountInfo) //TODO: change with live server;
            .then(res => {
                if (res.data.status == 'ok') {
                    form.reset()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Bazar Cost updated successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    getBazarCost()
                }
            })
            .catch(err => {
                console.log(err)
            })


    }


    return (
        <div>
        <PageTitle title={`Daily Bazar | Mess Mate`}/>
            <div className='my-4'>
                <h3 className="text-center text-2xl my-3">Your Daily Bazar Cost</h3>
                <hr />

                <form onSubmit={handleSaveData}>
                    {/* Date select */}
                    <div className='my-4'>
                        <div className='flex justify-center gap-2 items-center'>
                            <div>
                                <img src={showIcon} width={35} alt="" />
                            </div>
                            <div>
                                <input type='date'
                                    startdate={startdate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-center py-3'>
                        <div>
                            <div className='mb-2'>
                                <div className="form-control mb-2">
                                    <input type="text" name='name' placeholder="Enter the Name" className="input input-bordered lg:w-[400px] " required />
                                </div>
                                <div className="form-control">
                                    <input type="text" name='amount' placeholder="Enter the amount" className="input input-bordered lg:w-[400px] " required />
                                </div>
                            </div>
                            <button className='btn btn-accent w-[300px]' type='submit'>Save</button>
                        </div>
                    </div>
                </form>

            </div>


            {/* Showing filtering data in the table */}
            <hr className="my-2" />

            {
                bazardata.length == 0 ?
                    <>
                        <div className="text-center">
                            <h3 className='text-2xl font-semibold font-serif text-red-600 py-16'>Information Not Found..!</h3>
                        </div>
                    </>
                    :
                    <>

                        <div className="grid justify-center">
                            <div>
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
                                                bazardata.length > 0 ?
                                                    <>
                                                        <div className="overflow-x-auto">
                                                            <table className="table">
                                                                {/* head */}
                                                                <thead>
                                                                    <tr className="">
                                                                        <th>Name</th>
                                                                        <th>Cost</th>
                                                                        <th>Date</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {/* row 1 */}
                                                                    {
                                                                        bazardata.map((member, index) => <React.Fragment key={index}>
                                                                            <tr className="">
                                                                                <td>{member.name}</td>
                                                                                <td>{member.cost}</td>
                                                                                <td>{member.date}</td>
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
                                                    </>
                                                    :
                                                    <>
                                                        <div>
                                                            <h3 className='text-2xl font-semibold font-serif text-red-600 py-16'>Information Not Found..!</h3>
                                                        </div>
                                                    </>
                                            }
                                        </>
                                }
                            </div>
                        </div>
                    </>
            }


            {/* Modal For Update the Amount */}
            {/* Modal 4 */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg py-2">Enter updated Amount Number</h3>
                    <hr />
                    <div className='mt-2'>
                        <form onSubmit={handleUpdateBazarAmount}>
                            <div className="mb-2">
                                <input type="number" name='amount' placeholder="Enter Amount" className="input input-bordered input-accent w-full" required />
                            </div>
                            <div className="mb-2">
                                <button type="submit" className='btn btn-neutral'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>



        </div>
    );
}

export default DailyBazar;
