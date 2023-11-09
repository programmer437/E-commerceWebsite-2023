import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        answer: '',
        newPassword: '',
      });
    

  //Handle change in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
    
  }

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    try {   
      console.log("triggered");

      const res= await axios.post("/api/v1/auth/forgot-password",data);
      console.log("triggered",res);
        
      

      // Send the data to the server
      if(res.data.success){
        setTimeout(() => {
          toast.success(res.data.message);
          
        }, 100);
        
        navigate('/login');
      }else{
        toast.error(res.data.message);
      }
      
    } catch (error) {
     
      toast.error(error.response.data.message)
      
    }
  }
  return (
    <Layout title={"Forgot Password- Ecommerce app"}>
        <div className='forgot-password'>
        <h1>Enter Your details</h1>
        <form className="d-flex align-items-center justify-content-center flex-column" onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <input
              name='email'
              value={data.email}
              onChange={handleChange}
              type="email"
              className="form-control"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              placeholder='Enter your email'
              required

            />
          </div>
          <div className="mb-3">
            <input
              name='newPassword'
              value={data.newPassword}
              onChange={handleChange}
              type="password"
              className="form-control"
              id="exampleInputPassword"
              aria-describedby="emailHelp"
              placeholder='Enter new password'
              required

            />
          </div>
          <div className="mb-3">
            <input
              name='answer'
              value={data.answer}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="exampleInputAnswer"
              placeholder='What is mother maiden name?'
              required

            />
          </div>
          

          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
        </form>
        

      </div>
    </Layout>
  )
}

export default ForgotPassword