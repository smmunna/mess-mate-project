import React from 'react';

const MealStatusCard = ({amount,title, img}) => {
    return (
        <div>

            <div className="card w-64 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{title}</h2>
                    <hr className='border-2  w-full'/>
                    <div className="card-actions justify-end">
                        <h3 className='text-4xl font-bold flex justify-center items-center gap-3'>
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
