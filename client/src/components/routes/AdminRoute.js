import { useState,useEffect } from "react";
import {useAuth} from '../../context/auth';
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Helpers/Spinner";

export default function AdminRoute() {
    const [ok,setOk]=useState(false);
    const {auth,setAuth}=useAuth();

    useEffect(()=>{
        const authCheck = async () => {
            try {
                const res = await axios.get("/api/v1/auth/admin-auth");
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Handle 401 error here, e.g., redirect to an unauthorized page or show a message.
                    // For example, you can redirect the user to a "401 Unauthorized" page.
                    setOk(false);
                } else {
                    console.error(error);
                }
            }
        };
    if(auth?.token){
        authCheck();

    }
},[auth?.token]);

    return ok ? <Outlet/> : <Spinner path={`${auth?.user ? "" : "login"}`}/>;
}