import { useState } from "react"
import {Link} from "react-router-dom"
import {AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import OAuth from "../components/OAuth";
import { getAuth, createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import  {db} from '../firebase'
import { serverTimestamp, setDoc,doc } from "firebase/firestore";
import {  toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function SignUp() {

  const [showPassword, setShowPassword] =useState(false);

  const [formData, setFormData]  = useState({name:"",email:"",password:""});
   

  const {name,email,password} = {formData};

  const navigate = useNavigate();
  function handleChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
      
    }));
  }

  async function handleSubmit(e){
    e.preventDefault();  //to Prevent Page from Loading

    //Code to Sign in with import { ToastContainer, toast } from 'react-toastify';Email and Password Firebase Authentication
    try{
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth,formData.email,formData.password);
        //Adding Name to the User Firebase Object
        updateProfile(auth.currentUser,{displayName:formData.name})
        const user  = userCredential.user;
        // console.log(user);
        const formDataCopy = {...formData}
        delete formDataCopy.password;
        formDataCopy.timestamp = serverTimestamp();
        
        await setDoc(doc(db, "users",user.uid),formDataCopy);
        toast.success("Sign-up was successful");
        navigate("/");
    }
    catch(err){
        // console.log(err.message)
        toast.error("Something went wrong with registration");
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold ">Sign Up</h1>

      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
          
          <div className="md:w-[67%] lg:w-[50%] mb-12 md-mb-6 ">
            <img src="https://media.istockphoto.com/id/1271787791/photo/login-and-password-cyber-security-concept-data-protection-and-secured-internet-access.jpg?s=612x612&w=0&k=20&c=y3P5heHjYJfItFFN-DJmnJUVCVA7QjrGE3YRGh9Ua08=" alt="Login image" className="w-full rounded"/>
          </div>

          <div  className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
            <form onSubmit={handleSubmit}>
                <input className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out  " type="text" id="name" placeholder="Full Name" value={name} onChange={handleChange}   required/>
                <input className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out  " type="email" id="email" placeholder="Email address"  value={email} onChange={handleChange}   required/>
                <div className="relative mb-6">
                  <input className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out  " type={showPassword ? "text" :"password"} id="password" placeholder="Password"  value={password} onChange={handleChange} required />
                  {showPassword ? <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer " onClick={()=>setShowPassword((prevState)=>!prevState)}  />  : <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer " onClick={()=>setShowPassword((prevState)=>!prevState)} />}
                </div>

                <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                  <p className="mb-6 ">Have an Account..?
                    <Link to="/sign-in" className="text-red-500 hover:text-red-8  00 transition duration-200 ease-in-out ml-1">Login</Link>
                  </p>
                  {/* <p>
                  <Link to="/forgot-password"  className="text-blue-500 hover:text-blue-800 transition duration-200 ease-in-out ml-1"> Forgot Password </Link>
                  </p> */}
                </div>

                <button type="submit" className=" w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">Sign Up </button>

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
