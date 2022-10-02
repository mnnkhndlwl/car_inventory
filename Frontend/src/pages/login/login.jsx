import React from 'react'
import "./login.css"
import login from "../../img/login.svg"
import { Link } from 'react-router-dom'

export default function Login() {
  return (
      <div className='wrap'>
    <div className="containerlogin" id="container">
		<div className="form-container log-in-container">
			<form className='loginform' action="#">
				<h1 className='hr2'>Login</h1>
				<div className="social-container">
					<a href="#" className="social"><i className=" fab fa fa-google fa-2x"></i></a>
				</div>
				<span className='loginspan'>or use your account</span>
				<input className='logininput' type="email" placeholder="Email" />
				<input className='logininput' type="password" placeholder="Password" />
				<Link to='/home' style={{textDecoration:'none'}}>
				<button className='loginbutton' >Log In</button>
				</Link>
				<h5 className='hr1'> Don't have account? </h5>
				<Link to='/Signup' >
					<button className='p1'>Please Sign In</button> 
				</Link>
			</form>
		</div>
		<div className="overlay-container">
			<div className="overlay">
				<div className="overlay-panel overlay-right">
					<img className='signinimg' src={login} alt="logo" />
				</div>
			</div>
		</div>
	</div>
    </div>
  )
}