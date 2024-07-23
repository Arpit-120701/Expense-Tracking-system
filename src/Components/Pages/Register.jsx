import React , {useState, useEffect } from 'react'
import {Form , Input ,  message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinne from '../Layout/Spinne'

function Register() {
    const navigate = useNavigate()
    const [ loading , setLoading ]= useState(false)
    // form submission
    const submitHandler = async(values) =>{
        try{
            setLoading(true)
           await axios.post("/users/register",values)
           message.success('Registration Succesfull!!')
           setLoading(false)
           navigate('/login')
        }
        catch(err){
            setLoading(false)
            message.err("Inavlid User id or password!")

        }
    }

    //Prevent for login user 
    useEffect(()=>{
      if(localStorage.getItem('user')){
        navigate('/')
      }
    }, [navigate])
  return (
    <div className='register-page'>
    {loading && <Spinne></Spinne>}
      <Form layout='vertical' onFinish={submitHandler} >
      <h1>Registration...!!!</h1>
        <Form.Item label="User Name" name="name">
        <Input />
        </Form.Item>
        <Form.Item label="User Email" name="email">
        <Input type='email' />
        </Form.Item>
        <Form.Item label="User Password" name="password">
        <Input type="password" />
        </Form.Item>
        <div className='d-flex jsutify-content-between'>
            <Link to='/login'>Already Registered ? Click here to login!</Link>
            <button className='btn btn-primary'>Register !!</button>
        </div>
      </Form>
    </div>
  )
}

export default Register
