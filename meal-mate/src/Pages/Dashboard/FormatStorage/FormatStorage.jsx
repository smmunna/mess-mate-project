import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";

const FormatStorage = () => {
    const { user } = useContext(AuthContext)

    const handleFormat = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to restore this file!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, format it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const emailInfo = {
                    manager_email: user.email
                }
                axios.post(`http://localhost:8000/api/delete-data`, emailInfo) //TODO: change with live server;
                    .then(res => {
                        if (res.data.status == 'ok') {
                            Swal.fire(
                                'Formated!',
                                'Your file has been formated.',
                                'success'
                            )
                                .then(() => {
                                    // Reload the page
                                    window.location.reload();
                                });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })


            }
        })
    }
    return (
        <div>
            <h3 className="text-center text-2xl">Format the Storage</h3>
            <hr />
            <div className=" my-3 flex justify-center">
                <div className="space-y-2">
                    <h3 className="text-lg font-bold">Instruction:</h3>
                    <p>1. For starting the new month, you need to format the storage</p>
                    <p>2. If you face any problem with your data entry, then you need to format</p>
                    <p>3. After formating the storage, you have to register the new manager. Send the {"'"}Request for Manager{"'"} in the left navigation menu bar</p>
                    <p>4. Failing of both 1 & 2 cases, you can contact with <Link className="link-primary underline" to={`mailto:info@techzaint.com`}>Admin</Link></p>
                </div>
            </div>
            <hr />
            <div className="flex justify-center my-3">
                <button className="btn btn-error text-white" onClick={handleFormat}>Click to Format</button>
            </div>
        </div>
    );
}

export default FormatStorage;
