import React, {useState, useEffect} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { message } from "antd"
function Header() {
    //bg-body-tertiary
    //navbar-expand-lg 
    const [ loginUser , setLoginUser ] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        const user= JSON.parse(localStorage.getItem('user'))
        if(user){
            setLoginUser(user)
        }
    },[])

    const logoutHandler =()=> {
        localStorage.removeItem('user')
        navigate('/login')
        message.success("Logout Successfully !!")
    }
    return (
        <>
            <nav className="navbar bg-light bg-body-tertiary navbar-expand-lg " >
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to='/' >Expense Management System </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"> <p  className='nav-link active'>{ loginUser && loginUser.name}</p></li>
                            <li className="nav-item">
                                <button className=" btn btn-primary" to='/user' 
                                onClick={logoutHandler} >
                                    Logout 
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
