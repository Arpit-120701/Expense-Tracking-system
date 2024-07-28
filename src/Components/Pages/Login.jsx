import React ,{ useState, useEffect } from 'react'
import {Form , Input ,  message } from 'antd'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinne from '../Layout/Spinne'
import Navbar from '../Layout/Navbar'
import '../../CSS/Login.css'
import Footer from '../Layout/Footer'

function Login() {
    const navigate = useNavigate()
    const [ loading , setLoading ]= useState(false)

    const submitHandler = async(values) =>{
        try{
            setLoading(true)
            const {data} = await axios.post('/users/login',values)
            message.success('Login Success !!')
            localStorage.setItem('user', JSON.stringify({...data.user , password:''}))
            setLoading(false)
            navigate('/')

        }
        catch(error)
        {
            setLoading(false)
            message.error("Something went wrong !!!")
        }
    }

    useEffect(()=>{
      if(localStorage.getItem('user')){
        navigate('/')
      }
    }, [navigate])


  return (
    <>
    <Navbar></Navbar>
    <div className='mainContainer'>
    <div className='heading'>
      <p><b>EXPENSO APP</b></p>
      <hr className='hr'  ></hr>
      <p style={{fontSize:"1.7rem",color:"white"}}><b>"Effortlessly track, manage, and save your <br></br>finances with Expnse – your  ultimate companion<br></br> for smarter spending and budgeting."</b></p>
    </div>
     <div className='register-page'>
     {
        loading && <Spinne></Spinne>
     }
      <Form layout='vertical' onFinish={submitHandler} >
      <h1>Login into your Account ?</h1>
        <Form.Item label="Email" name="email">
        <Input type='email' />
        </Form.Item>
        <Form.Item label="Password" name="password">
        <Input type="password" />
        </Form.Item>
        <div className='d-flex jsutify-content-between'>
            <Link to='/Register'>Not have an account ? Sign up here...</Link>
            <button className='btn btn-primary'>Login </button>
        </div>
      </Form>
    </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default Login
