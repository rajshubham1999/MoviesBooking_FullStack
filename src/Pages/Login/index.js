import React, { Component, useEffect } from 'react'
import {Form, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import './Login.css'; 


import Button from '../../components/button.js'
import { LoginUser } from '../../apicalls/users.js'

function Login() {

  const navigate = useNavigate()

  const onFinish= async (values)=>{
    try{
      const response = await LoginUser(values);
      if(response.success){
        message.success(response.message);
        localStorage.setItem('token', response.data);
        navigate('/');
      }
      else{
        message.error(response.message);
        console.log(response.message)
      }
    }catch(err){
      message.error(err);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/"); // Get User Info from server
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center h-screen items-center bg-image">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">
          Welcome back to Booking Shows! Please Login{" "}
        </h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <input type="email" style={{padding:'3px'}} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input type="password" style={{padding:'3px'}}/>
          </Form.Item>

          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="Login" type="submit" />
            <Link to="/register" className='text-black'>
              {" "}
              New to Booking Shows? Register
            </Link>
            
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login