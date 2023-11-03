import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: ''
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
      const res= await axios.post("/api/v1/auth/register",data);
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
      console.log(error);
      toast.error("Something went wrong")
      
    }
  }

  return (
    <Layout title="Register">
      <div className='register'>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              name='name'
              value={data.name}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"
              placeholder='Enter your name'
              required
            />
          </div>
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
          <div className="mb-3">
            <input
              name='address'
              value={data.address}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="exampleInputAdrress"
              placeholder='Adrress'
              required

            />
          </div>
          <div className="mb-3">
            <input
              name='phone'
              value={data.phone}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="exampleInputPhone"
              placeholder='Enter Phone Number'
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

export default Register;