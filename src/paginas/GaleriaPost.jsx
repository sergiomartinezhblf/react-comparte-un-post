import React from 'react'
import { useState,useEffect } from "react"
import { obtenerPost} from '../firebase/configFirestore'
import Post from '../componentes/Post'



function GaleriaPost() {

  const [galeria,setGaleria] = useState ([])

  const fetchGaleria = async () => {
    let imagenes = await obtenerPost()
    console.log(imagenes)
    setGaleria(imagenes)
    console.log(galeria)
  } 

  useEffect(() => {
    
  fetchGaleria()
  console.log(galeria)
    
  },[])
  
   
  
  return (
    <>
    
    <div className="container mt-3">
      
      {
        galeria.map(elem => {
          return (
            <div key={elem.uuid}>
            <Post email={elem.email} creacion={elem.creacion} mensaje={elem.mensaje} imagenes={elem.imagenes}/>
            </div> )  
        }
          )
      }
    </div>
    
    
    </>
  )
}

export default GaleriaPost