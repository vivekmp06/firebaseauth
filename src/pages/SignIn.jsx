import { useState } from "react"
import {Link, Navigate, useNavigate} from "react-router-dom"
import {AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import {toast} from "react-toastify";
 

export default function SignIn() {

  const [showPassword, setShowPassword] =useState(false);

  const [formData, setFormData]  = useState({email:"",password:""});
   

  const {email,password} = {formData};
  const navigate = useNavigate();

  function handleChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
      
    }));
  }
  async function handleSignIn(e){
    //prevent page from loading 
    console.log("sign in func called");
    e.preventDefault();
    try{
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth,formData.email,formData.password);
      if(userCredential.user){
        navigate("/");
      }

    }
    catch(error){
        console.log(error)
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold ">Sign In</h1>

      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
          
          <div className="md:w-[67%] lg:w-[50%] mb-12 md-mb-6 ">
            <img src="https://media.istockphoto.com/id/1271787791/photo/login-and-password-cyber-security-concept-data-protection-and-secured-internet-access.jpg?s=612x612&w=0&k=20&c=y3P5heHjYJfItFFN-DJmnJUVCVA7QjrGE3YRGh9Ua08=" alt="Login image" className="w-full rounded"/>
          </div>

          <div  className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
            <form onSubmit={handleSignIn}>
                <input className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out  " type="email" id="email" placeholder="Email address"  value={email} onChange={handleChange}  />
                <div className="relative mb-6">
                  <input className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out  " type={showPassword ? "text" :"password"} id="password" placeholder="Password"  value={password} onChange={handleChange}  />
                  {showPassword ? <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer " onClick={()=>setShowPassword((prevState)=>!prevState)}  />  : <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer " onClick={()=>setShowPassword((prevState)=>!prevState)} />}
                </div>

                <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                  <p className="mb-6 ">Don't have an account..?
                    <Link to="/sign-up" className="text-red-500 hover:text-red-8  00 transition duration-200 ease-in-out ml-1">Register</Link>
                  </p>
                  <p>
                  <Link to="/forgot-password"  className="text-blue-500 hover:text-blue-800 transition duration-200 ease-in-out ml-1"> Forgot Password </Link>
                  </p>
                </div>

                <button type="submit" className=" w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">Sign In </button>

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
