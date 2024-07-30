import { useState,useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import IndexAgregar from './paginas/IndexAgregar';
import GaleriaPost from './paginas/GaleriaPost';
import NotFound from './paginas/NotFound';
import Navbar from './componentes/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext } from 'react';
import './App.css';
import { obtenerDocs } from './firebase/configFirestore';

export const imagenesContext = createContext()
  let x = 0


function App() {

  const [first, setfirst] = useState("")

  
  const obtenerArchivosFirebase = async() =>{
     let arrayDocs=[] 
     let res = await obtenerDocs()
     Object.values(res).forEach(el=>{
      arrayDocs.push(el)
     })
     console.log(arrayDocs)
     setfirst("hola")
     console.log(first)
  }

  useEffect(()=>{
       obtenerArchivosFirebase()
       console.log("se obtienen los archivos de firebase")
       
       
  },[])

  return (
    <main className='margen'>
      <h1 className='text-center mt-3'>Comparte un Post</h1>
    <imagenesContext.Provider value={x}>
    <BrowserRouter>
        <Navbar/>
        <Routes>
           <Route path='/' element= {<IndexAgregar/>} />
           <Route path='/post' element= {<GaleriaPost/>} />
           <Route path='/*' element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
    </imagenesContext.Provider>
    </main>
  );
}

export default App;
