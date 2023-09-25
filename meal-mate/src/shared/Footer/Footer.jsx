import React from 'react';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <div>
            <footer className="footer footer-center p-4 bg-slate-300 text-base-content py-5">
                <aside>
                    <p>Copyright © {year} - All right reserved by <a className='hover:link-primary underline' href="www.techzaint.com">TechZaint</a> <span className='text-red-500 text-lg'>♥</span></p>
                </aside>
            </footer>
        </div>
    );
}

export default Footer;
