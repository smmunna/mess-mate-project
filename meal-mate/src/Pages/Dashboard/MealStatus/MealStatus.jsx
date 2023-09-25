import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import axios from 'axios';
import MealStatusCard from '../../../components/MealStatusCard/MealStatusCard';
import Spinner from '../../../components/Spinner/Spinner';
import takaIcon from '../../../assets/icon/taka.png';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment/moment';

const MealStatus = () => {
    const { user } = useContext(AuthContext);
    const [collectedamount, setCollectedamount] = useState([]);
    const [totalcostamount, setTotalcostamount] = useState([]);
    const [totalmealamount, setTotalmealamount] = useState([]);
    const [getUser, setGetUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const componentRef = useRef();

    // Print this page
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    // Getting the Date;
    const date = Date.now();
    const dateFormat = (moment(date).format("DD MMMM YYYY hh:mm:ss A"));


    // Get collected Balance;
    useEffect(() => {
        axios.get(`http://localhost:8000/api/collected-amount?manager_email=${user.email}`, { //TODO: change with live server
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                // console.log(res.data)
                const totalCollectedAmount = res.data.reduce((preValue, currentValue) => {
                    return preValue + parseFloat(currentValue.amount)
                }, 0)
                const evalTotalCost = totalCollectedAmount > 0 ? totalCollectedAmount : '0';
                setCollectedamount(evalTotalCost);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    // Get total bazar cost;
    useEffect(() => {
        axios.get(`http://localhost:8000/api/cost-bazar?manager_email=${user.email}`, { //TODO: change with live server;
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                // console.log(res.data)
                const totalCostAmount = res.data.reduce((preValue, currentValue) => {
                    return preValue + parseFloat(currentValue.cost)
                }, 0)

                const evalTotalCost = totalCostAmount > 0 ? totalCostAmount : '0';
                setTotalcostamount(evalTotalCost);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])


    // Get total mealCounted Number cost;
    useEffect(() => {
        axios.get(`http://localhost:8000/api/total-meal-for-member?manager_email=${user.email}`, { //TODO: change with live server;
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                // console.log(res.data)
                setGetUser(res.data)
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])



    // Get total meal;
    useEffect(() => {
        axios.get(`http://localhost:8000/api/cost-meal?manager_email=${user.email}`, { //TODO: change with live server;
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                // console.log(res.data)
                const totalCostAmount = res.data.reduce((preValue, currentValue) => {
                    return preValue + parseFloat(currentValue.mealNumber)
                }, 0)

                const evalTotalCost = totalCostAmount > 0 ? totalCostAmount : '0';
                setTotalmealamount(evalTotalCost);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])


    // Inhand Amount counting;
    const manager_inhand = (collectedamount > 0 && totalmealamount > 0)
        ? (collectedamount - totalcostamount)
        : "0";

    // Finding the Meal Rate;
    const mealRate = (totalcostamount > 0 && totalmealamount > 0)
        ? (totalcostamount / totalmealamount).toFixed(2)
        : "0";


    return (
        <div ref={componentRef}>
            <h3 className="text-center text-2xl my-3">Current Summary of this Month</h3>
            <hr />
            <div className='flex justify-center'>
                <div className='card-print py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-5'>
                {loading && <Spinner />}
                    <>
                        <MealStatusCard title={`Collected Amount`} amount={collectedamount} img={takaIcon} />
                        <MealStatusCard title={`Total Cost`} amount={totalcostamount} img={takaIcon} />
                        <MealStatusCard title={`Inhand`} amount={manager_inhand} img={takaIcon} />
                        {/* <MealStatusCard title={`Total Meal`} amount={totalmealamount} /> */}
                        <MealStatusCard title={`Meal Rate`} amount={mealRate} img={takaIcon} />
                    </>
                </div>
            </div>

            {/* Table for current status for each member */}
            <div>
                <div>
                    {
                        getUser.length > 0 ?
                            <>
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                            <tr className='text-center bg-black text-white'>
                                                <th>Name</th>
                                                <th>Total Meal</th>
                                                <th>Current Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* row 1 */}
                                            {
                                                getUser.map((member, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <tr className={`text-center ${(index + 1) % 2 == 0 ? 'bg-slate-100' : ''}`}>
                                                                <td>{member.names}</td>
                                                                <td>{member.mealNumber}</td>
                                                                <td>{((parseFloat(member.amount) - (parseFloat(member.mealNumber) * mealRate)).toFixed(2)) < 0 ?
                                                                    <>
                                                                        <span className='text-red-500 font-bold'>
                                                                            {
                                                                                ((parseFloat(member.amount) - (parseFloat(member.mealNumber) * mealRate)).toFixed(2))
                                                                            }
                                                                        </span>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <span className='font-bold text-green-500'>
                                                                            {
                                                                                ((parseFloat(member.amount) - (parseFloat(member.mealNumber) * mealRate)).toFixed(2))
                                                                            }
                                                                        </span>
                                                                    </>
                                                                } Taka</td>
                                                            </tr>
                                                        </React.Fragment>
                                                    );
                                                })
                                            }

                                            {/* Total meal number showing */}
                                            {/* <tr className='text-center'>
                                                <td className='text-lg font-bold'>Total Meal</td>
                                                <td className='text-xl font-bold'>{totalmealamount}</td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                            :
                            <>
                                <div className='text-center'>
                                    <h3 className='text-2xl font-semibold font-serif text-red-600 py-16'>Information Not Found..!</h3>
                                </div>
                            </>
                    }
                </div>
            </div>
            <hr className='bg-slate-300 py-[1px] my-4' />

            <div className='flex justify-center my-6'>
                <div>
                    <button className='btn btn-accent hide-btn' onClick={handlePrint}>Print</button>
                    <p className='print-only text-slate-400'>Developer: <a href="https://www.facebook.com/smmunna21">Minhazul Abedin Munna</a> | Print Date: {dateFormat}</p>
                </div>
            </div>
        </div>
    );
}

export default MealStatus;
