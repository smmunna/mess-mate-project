import React from 'react';

const MealStatusCard = ({ amount, title, img }) => {
    return (
        <div>

            <div className="mt-2">
                <div className='space-y-2'>
                    <h2 className="card-title">{title}</h2>
                    <hr className='border-2  w-full' />
                    <div>
                        <h3 className='text-xl bg-slate-700 text-white p-2 font-bold flex justify-center items-center gap-3'>
                            {amount}
                            {img && <img src={img} className='mt-1' width={40} />}
                        </h3>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MealStatusCard;
