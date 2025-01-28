import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router'
import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [message, setMessage] = React.useState('')
  const {loginUser,signInWithGoogle}=useAuth();
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      alert("Login Sucessful")
      navigate('/')
    } catch (error) {
      alert("Login Failed , Make sure you are login with gmail ")
      console.log(error)
      
    }
    console.log('Google Login')

  }
  const navigate=useNavigate();
  const {register, handleSubmit,watch,formState:{errors}} = useForm()
  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password)
      alert("Login Successful")
      navigate("/")


    } catch (error) {
      setMessage("Please provide valid mail and password ")
      console.log(error)
    }
    // console.log(data)
  }
  return (
    <div className='border flex items-center justify-center h-[calc(100vh-120px)] '>
      <div className='w-full max-w-sm items-center mx-auto bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-2 '>
        <h2 className='text-xl font-semibold mb-4'>Please Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=' mb-4'>
            <label htmlFor="email" className='block text-gray-800 text-sm font-bold mb-2'>Email</label>
            <input
            {...register("email",{required:true})}
            type="email" name="email" id='email' placeholder='Email Address' className='border-4 rounded-xl shadow appearance-none w-full py-2 px-3 leading-tight focus:outline-none' />
          </div>
          <div className=' mb-4'>
            <label htmlFor="password" className='block text-gray-800 text-sm font-bold mb-2'>Password</label>
            <input
            {...register("password",{required:true})}
            type="password" name="password" id='password' placeholder='Password' className='border-4 rounded-xl shadow appearance-none w-full py-2 px-3 leading-tight focus:outline-none' />
          </div>
          <div>
          {
                    message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                }
            <button 
            
            className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded focus:outline-none focus:shadow '>
              Login 
            </button>
          </div>
        </form>
        <p className='align-basline font-medium mt-4 text-sm'>Haven't an account ? Please
           <Link to="/register" className='mx-1 text-blue-500 hover:text-blue-700'>Register</Link></p>
      <div className='mt-4'>
        <button 
        onClick={handleGoogleLogin}
        className='w-full flex flex-wrap items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none '
        >
          <FaGoogle className='mr-2'></FaGoogle>
          Sign in with Google
        </button>
      </div>
      
      <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Login