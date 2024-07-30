import React from 'react'
import PostImage from './PostImage'
import { CgProfile } from "react-icons/cg"


function Post({email,creacion,mensaje,imagenes}) {  
  return (
    <div className="card text-dark bg-light mb-3">
    <div className="card-header">
        <p className='m-0'><CgProfile />  {email}</p>
        <small className="text-muted"><span>Compartido el: </span>{creacion.toLocaleString()}</small>
        
    </div>
    <div className="card-body">
    <h5 className="card-title"></h5>
    <p className="card-text">{mensaje}</p>
    <div className="row row-cols-1 row-cols-md-2 g-4">
     {
        imagenes.map(elem=>{
           return (<div key={elem}><PostImage url={elem}/></div>)
        })
     }   
    </div>
    </div>
    </div>
  )
}

export default Post