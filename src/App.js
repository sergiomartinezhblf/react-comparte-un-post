import { useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import IndexAgregar from './paginas/IndexAgregar';
import GaleriaPost from './paginas/GaleriaPost';
import NotFound from './paginas/NotFound';
import Navbar from './componentes/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { obtenerPost } from './firebase/configFirestore';



function App() {



  
  const obtenerArchivosFirebase = async() =>{
     let arrayDocs=[] 
     let res = await obtenerPost()
     Object.values(res).forEach(el=>{
      arrayDocs.push(el)
     })
     console.log(arrayDocs)
     
  }

  useEffect(()=>{
       obtenerArchivosFirebase()
       console.log("se obtienen los archivos de firebase")
       
       
  },[])

  return (
    <main className='margen color'>
      <h1 className='text-center mt-3'>Comparte un Post</h1>
    
    <BrowserRouter>
        <Navbar/>
        <Routes>
           <Route path='/index' element= {<IndexAgregar/>} />
           <Route path='/post' element= {<GaleriaPost/>} />
           <Route path='/react-comparte-un-post' element= {<GaleriaPost/>} />
           <Route path='/*' element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
    </main>
  );
}

export default App;
