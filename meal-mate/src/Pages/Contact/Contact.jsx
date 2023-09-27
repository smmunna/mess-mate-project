import React from 'react';
import callIcon from '../../assets/icon/phone.png'
import mailIcon from '../../assets/icon/mail.png'

const Contact = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-left text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Contact Us</h1>
                        <hr />
                        <p className="mb-5">If you face any kind of problem or others issue. Directly contact with admin.</p>
                        <div>
                            <div className='flex gap-4'>
                                <button className="btn btn-info space-x-1"><img src={mailIcon} width={30} alt="" /><a href="mailto:info@techzaint.com">Email us</a></button>
                                <button className="btn btn-neutral space-x-1"><img src={callIcon} width={30} alt="" /><a href="tel:01611765966">Call Us</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
