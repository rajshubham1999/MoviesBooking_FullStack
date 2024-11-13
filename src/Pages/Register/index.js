import React, { Component, useEffect } from 'react'
import {Form, message} from 'antd'

import {Link, useNavigate} from "react-router-dom"
import Button from '../../components/button.js'
import { RegisterUser } from '../../apicalls/users.js'
import './Register.css'; 

function Register() {
  const navigate = useNavigate()
  const onFinish= async (values)=>{
    try{
      const response = await RegisterUser(values);
      if(response.success){
        message.success(response.message);
        navigate("/login");
        console.log(response.message)
      }
      else{
        message.error(response.message);
        console.log(response.message)
      }
    }catch(err){
      message.error(err);
    }
  }
  
  return (
    <div className="flex justify-center h-screen items-center bg-image">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">
          Welcome to Booking Shows! Please Register{" "}
        </h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <input type="text" style={{padding:'3px'}} />
          </Form.Item>
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
            <Button fullWidth title="REGISTER" type="submit" />
            <Link to="/login" className="text-black">
              {" "}
              Already have an account? Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register