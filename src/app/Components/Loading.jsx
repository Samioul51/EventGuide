import React from 'react';

const Loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <span className="loading loading-infinity loading-xs"></span>
            <span className="loading loading-infinity loading-sm"></span>
            <span className="loading loading-infinity loading-md"></span>
            <span className="loading loading-infinity loading-lg"></span>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    );
};

export default Loading;