import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';


const Spinner = () => {
    const [count, setCount] = useState(4);
    const navigate=useNavigate();
    const location=useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        if(count===0){
            navigate("/login",{state:location.pathname});
        }
        return () => clearInterval(interval);
    }, [count,navigate]);

    return (
        <div className="d-flex align-items-center justify-content-center flex-column" style={{height: "85vh"}}>
            <h1 className='text-center'>You are not logged in Redirecting to loginpage in {count} seconds</h1>
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    )
}

export default Spinner