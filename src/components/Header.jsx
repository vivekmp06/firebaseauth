import {useLocation, useNavigate} from "react-router-dom"

export default function Header() {

  const location = useLocation();
  const navigate = useNavigate();

  function pathMathRoute(route){
    if(route  ==location.pathname){
      return true;
    }
  }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
      <header className='flex justify-between item-center px-3 max-w-6xl mx-auto'>
        <div>
          <img src='' className='h-5 cursor-pointer'  alt='Logo' onClick={()=>navigate("/")}/> 
        </div>
        <div>
          <ul className='flex space-x-10'>
            <li className={`cursor-pointer py-3 text -sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/") && "tet-black border-b-red-500"}`} onClick={()=>navigate("/home")}>Home</li>
            <li className={`cursor-pointer py-3 text -sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "tet-black border-b-red-500"}`} onClick={()=>navigate("/offers")}>Offers</li>
            <li className={`cursor-pointer py-3 text -sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/sign-in") && "tet-black border-b-red-500"}`} onClick={()=>navigate("/sign-in")}>Sign In</li>
          </ul>
        </div>
      </header>
    </div>
  )
}
