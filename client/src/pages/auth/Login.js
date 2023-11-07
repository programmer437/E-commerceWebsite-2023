import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';


const Login = () => {
  const location = useLocation();
    const navigate = useNavigate();
    const {auth,setAuth} = useAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  console.log(data);


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
      const res= await axios.post("/api/v1/auth/login",data);
      // Send the data to the server
      if(res.data.success){
        setTimeout(() => {
          toast.success(res.data.message);
        }, 100);
        setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token
            })
            localStorage.setItem("auth",JSON.stringify(res.data));
        
        navigate(location.state || "/");
      }else{
        toast.error(res.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
      
    }
  }
  return (
    <Layout title="Register">
      <div className='register'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          
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
              name='password'
              value={data.password}
              onChange={handleChange}
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder='Enter your password'
              required

            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        

      </div>
    </Layout>
  )
}

export default Login