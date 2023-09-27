import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import Spinner from '../../../components/Spinner/Spinner';
import axios from 'axios';
import showIcon from "../../../assets/icon/date.png"
import Swal from 'sweetalert2';

const DailyCost = () => {
    const [getmember, setGetmember] = useState([])
    const [mealNumbers, setMealNumbers] = useState([]);
    const [startdate, setStartDate] = useState('');
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

    const handleSaveData = (e) => {
        e.preventDefault();
        const form = e.target;

        const memberMealNumbers = getmember.map((member, index) => ({
            member_id: member.id,
            manager_email: member.manager_email,
            name: member.name,
            mealNumber: parseFloat(mealNumbers[index] || 0),
            date: startdate
            // Default to 0 if no meal number selected
        }));

        const mealInfo = {
            data: memberMealNumbers
        }

        console.log(mealInfo)

        // send to the server;
        axios.post(`http://localhost:8000/api/save-dailymeal`, mealInfo) //TODO: change with live site
            .then(res => {
                if (res.data.status == 'ok') {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
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
            <h3 className="text-center text-2xl my-3">Your Daily Meal</h3>
            <hr />

            {/* Date select */}
            <form onSubmit={handleSaveData}>
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

                <div>
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
                                        getmember.length > 0 ?
                                            <div className='flex justify-center'>
                                                <div className="overflow-x-auto">
                                                    <table className="table">
                                                        {/* head */}
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Number of Meal</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {/* row 1 */}
                                                            {
                                                                getmember.map((member, index) => <React.Fragment key={index}>
                                                                    <tr>
                                                                        <td>{member.name}</td>
                                                                        <td>
                                                                            <div>

                                                                                <select className="select select-success w-full max-w-xs"
                                                                                    defaultValue={mealNumbers[index] || 0}
                                                                                    onChange={(e) => {
                                                                                        const updatedMealNumbers = [...mealNumbers];
                                                                                        updatedMealNumbers[index] = parseFloat(e.target.value);
                                                                                        setMealNumbers(updatedMealNumbers);
                                                                                    }}>
                                                                                    <option key={index + 1} selected>Choose one</option>
                                                                                    <option  value={0}>0</option>
                                                                                    <option value={1}>1</option>
                                                                                    <option value={2}>2</option>
                                                                                    <option value={3}>3</option>
                                                                                    <option value={4}>4</option>
                                                                                    <option value={5}>5</option>
                                                                                    <option value={6}>6</option>
                                                                                    <option value={0.5}>0.5</option>
                                                                                    <option value={1.5}>1.5</option>
                                                                                    <option value={2.5}>2.5</option>
                                                                                    <option value={3.5}>3.5</option>
                                                                                    <option value={4.5}>4.5</option>
                                                                                    <option value={5.5}>5.5</option>
                                                                                </select>

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
                                                    <h3 className='text-2xl text-center font-semibold font-serif text-red-600 py-16'>No member hasbeen Found..!</h3>
                                                </div>
                                            </>
                                    }

                                </>
                        }

                    </div>
                </div>

                <hr />
                <div className='my-4 grid justify-center'>
                    <button className='btn btn-accent w-[300px]' type='submit'>Save</button>
                </div>

            </form>
        </div>
    );
}

export default DailyCost;
