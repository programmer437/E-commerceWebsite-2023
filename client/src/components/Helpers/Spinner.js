import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';



const Spinner = ({path= "login"}) => {
    const {auth} = useAuth();
    const [count, setCount] = useState(4);
    const navigate=useNavigate();
    const location=useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        if(count===0){
            navigate(`/${path}`,{state:location.pathname});
        }
        return () => clearInterval(interval);
    }, [count,navigate,path]);

    return (
        <div className="d-flex align-items-center justify-content-center flex-column" style={{height: "85vh"}}>
            <h1 className='text-center'>{auth?.user && !auth?.user?.role ? `You are not admin redirecting to homepage in ${count} seconds`:`You are not logged in redirecting to login in ${count} seconds`}</h1>
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    )
}

export default Spinner