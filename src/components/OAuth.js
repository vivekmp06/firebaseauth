import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import  {db} from '../firebase'
import { getDoc, serverTimestamp, setDoc,doc } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';

export default function OAuth() {

  const Navigate = useNavigate();

  async function onGoogleClick(){
    // console.log("onGoogleClick function called");
    try{
      const auth =getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth,provider);
      const user = result.user;
      // console.log(user);

      //Get details from Google Ref
      const docRef = doc(db,"users",user.uid);
      const docSnap = await getDoc(docRef);

      //adding user details tu user Firestore DB if it doesn't exists
      if(!docSnap.exists()){
        await setDoc(docRef, {name:user.displayName,email:user.email,timestamp:serverTimestamp()})
      }
      toast.success("User Sign-in Successful")
    Navigate("/");
    }
    catch(error){
      toast.error("Could Not Authorize with Google");
      // console.log(error)
    }
  }
  return (
    <button type="button" onClick={onGoogleClick} className='flex items-center justify-center w-full bg-red-500  text-white  px-7 py-3  uppercase text-sm font-medium  hover:bg-red-700  active:bg-red-800 transition duration-150 shadow-md hover:shadow-lg active:shadow-lg ease-in-out rounded'><FcGoogle className='text-2xl  bg-white rounded mr-2 ' />Continue with Google</button>
  )
}
