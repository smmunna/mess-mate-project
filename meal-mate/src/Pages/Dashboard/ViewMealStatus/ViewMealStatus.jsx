import React from "react";
import { useContext, useState } from "react";
import showIcon from "../../../assets/icon/date.png"
import { AuthContext } from "../../../provider/AuthProvider";
import axios from "axios";
import Spinner from "../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ViewMealStatus = () => {
    const [startdate, setStartDate] = useState('');
    const [filterData, setFilterdata] = useState([]);
    const [isLoaded, setLoaded] = useState(false)
    const [id, setId] = useState([]);
    const { user } = useContext(AuthContext)

    const handleShowFormdata = (e) => {
        e.preventDefault();
        const date = startdate;
        const email = user.email;

        // Construct the URL with query parameters
        const url = `http://localhost:8000/api/view-meal-status?email=${email}&date=${date}`; //TODO: change with live server;
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                setFilterdata(res.data);
                setLoaded(true)
                // console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });

    }

    // Update MealNumber;
    const handleUpdateMealNumber = (e) => {
        e.preventDefault()
        const form = e.target;
        const mealNumber = form.mealNumber.value;
        const mealInfo = {
            mealNumber
        }
        axios.put(`http://localhost:8000/api/update-meal-number/${id}`, mealInfo) //TODO: change with live server;
            .then(res => {
                if (res.data.status == 'ok') {
                    form.reset()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Meal Number updated successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

                // Re Render the component again after update;
                const updateFilterData = filterData.map((member, index) => {
                    if (id == member.id) {
                        return {
                            ...member,
                            mealNumber: mealNumber
                        }
                    }
                    return member;
                })

                // Set the value again for re render;
                setFilterdata(updateFilterData)

            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div>
            <h3 className="text-center text-2xl my-3">View Meal Status</h3>
            <hr />
            <div>
                <div>
                    <form onSubmit={handleShowFormdata}>

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

                        <hr />
                        <div className='my-4 grid justify-center'>
                            <button className='btn btn-accent w-[200px]' type='submit'>Show</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Showing filtering data in the table */}
            <hr className="my-2" />

            {
                filterData.length == 0 ?
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
                                                filterData.length > 0 ?
                                                    <>
                                                        <div className="overflow-x-auto">
                                                            <table className="table">
                                                                {/* head */}
                                                                <thead>
                                                                    <tr className="text-center">
                                                                        <th>Name</th>
                                                                        <th>Meal Number</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {/* row 1 */}
                                                                    {
                                                                        filterData.map((member, index) => <React.Fragment key={index}>
                                                                            <tr className="text-center">
                                                                                <td>{member.name}</td>
                                                                                <td>{member.mealNumber}</td>
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


            {/* Modal 4 */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg py-2">Enter updated Meal Number</h3>
                    <hr />
                    <div className='mt-2'>
                        <form onSubmit={handleUpdateMealNumber}>
                            <div className="mb-2">
                                <input type="number" name='mealNumber' placeholder="Enter mealNumber" className="input input-bordered input-accent w-full" required />
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

export default ViewMealStatus;
