import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment/moment";
import PageTitle from "../../../components/PageTitle/PageTitle";


const ManagerRequest = () => {
    const [reqUser, setReqUser] = useState([]);
    const { user } = useContext(AuthContext)


    // user request details;
    const userReq = () => {
        axios.get(`https://messmateserver.techzaint.com/api/user-req-status/${user.email}`, { //TODO:Change with live server;
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        }) //TODO: change with live site;
            .then(res => {
                // console.log(res)
                setReqUser(res.data)
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        userReq()
    }, [])



    const handleSendRequest = (e) => {
        e.preventDefault();
        const form = e.target;
        const mess_name = (form.role_req.value).toLowerCase().replace(/\s+/g, '');
        const reqInfo = {
            email: user.email,
            mess_name,
            role_req: 'manager'
        }

        // Send request to the server;
        axios.post(`https://messmateserver.techzaint.com/api/request-manager`, reqInfo) //TODO: change with live server;
            .then(res => {
                if (res.data.status == 'exist') {
                    toast.error('Sorry! your have already sent the request !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                else if (res.data.status == 'ok') {
                    toast.success('Request sent successfully..', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                form.reset();
                userReq();
            })
            .catch(err => {
                console.log(err)
            })
    }



    return (
        <div>
        <PageTitle title={`Request Manager | Mess Mate`}/>
            <div className="flex justify-center">
                <div>
                    <div>
                        <h3 className="text-2xl font-bold py-3">Request For Manager</h3>
                        <hr />
                        <div>
                            <form onSubmit={handleSendRequest}>
                                <div className="space-y-4 mt-4">
                                    <label htmlFor="Mess Name">Mess Name:</label>
                                    <input type="text" name="role_req" placeholder="Type here" className="input input-bordered input-secondary w-full max-w-xs" required />
                                </div>
                                <button className="btn btn-neutral mt-4">Send Request</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-4" />
            {
                reqUser.mess_name ?
                    <>
                        <div className="flex justify-center">
                            <div>
                                <div>
                                    <span className="font-bold">Mess Name:</span> {reqUser.mess_name}
                                </div>
                                <div>
                                    <span className="font-bold"> Request for role:</span> {reqUser.role_req}
                                </div>
                                <div>
                                    <span className="font-bold">Current status:</span>  {reqUser.status == 'pending' ? <span className="text-red-500">Pending</span> : ''}
                                </div>
                                <div>
                                    <span className="font-bold">Request Date:</span> {moment(reqUser.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                                </div>
                            </div>
                        </div>
                    </> :
                    <>
                        <div>
                            <h3 className="text-center text-red-500 font-bold">No request found..!</h3>
                        </div>
                    </>
            }


            <ToastContainer />
        </div>
    );
}

export default ManagerRequest;
