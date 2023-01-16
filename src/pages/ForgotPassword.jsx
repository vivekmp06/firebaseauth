import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react"
import {Link} from "react-router-dom"
import { toast } from "react-toastify";

import OAuth from "../components/OAuth";

export default function ForgotPassword() {

  const [email, setEmail]  = useState("");
   
  function handleChange(e){
    setEmail(e.target.value);
  }

  async function handleForgotPassword(e){
    e.preventDefault();
    try{
      const auth = getAuth()
      await sendPasswordResetEmail(auth,email);
      toast.success("Email was sent");
    }
    catch(error){
      toast.error("Couldn't send Reset Password...Please provide valid Email ");
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold ">Forgot Password</h1>

      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
          
          <div className="md:w-[67%] lg:w-[50%] mb-12 md-mb-6 ">
            <img src="https://media.istockphoto.com/id/1271787791/photo/login-and-password-cyber-security-concept-data-protection-and-secured-internet-access.jpg?s=612x612&w=0&k=20&c=y3P5heHjYJfItFFN-DJmnJUVCVA7QjrGE3YRGh9Ua08=" alt="Login image" className="w-full rounded"/>
          </div>

          <div  className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
            <form onSubmit={handleForgotPassword}>
                <input className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out  " type="email" id="email" placeholder="Email address"  value={email} onChange={handleChange}  />

                
                <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                  <p className="mb-6 ">Don't have an Account..?
                    <Link to="/sign-up" className="text-red-500 hover:text-red-8  00 transition duration-200 ease-in-out ml-1">Register</Link>
                  </p>
                  <p>
                  <Link to="/sign-in"  className="text-blue-500 hover:text-blue-800 transition duration-200 ease-in-out ml-1"> Sign in instead</Link>
                  </p>
                </div>
 

                <button type="submit" className=" w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">Send Reset Password </button>

                <div className="flex my-4  before:border-t  before:flex-1 items-center before:border-gray-300  after:border-t  after:flex-1  after:border-gray-300 ">
                  <p className="text-center font-semibold mx-4">OR</p>
                </div>
            </form>              
            <OAuth/>
          </div>
      </div>
    </section>


  ); 
}
