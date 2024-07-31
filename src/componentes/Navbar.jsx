import { NavLink } from "react-router-dom"
import '../App.css'
import { IoMdAdd } from "react-icons/io"
import { BiImages } from "react-icons/bi"

function Navbar() {
  return (
    <div className="hstack gap-3 mt-3">
     <NavLink className={({isActive})=>isActive?'btn btn-primary ms-auto':'btn btn-outline-primary ms-auto'} to='/index'>Nuevo <IoMdAdd />
     </NavLink> 
     <NavLink className={({isActive})=>isActive?'btn btn-primary':'btn btn-outline-primary'} to='/post'>Post <BiImages />
     </NavLink>
    </div>
  )
}

export default Navbar