import { useEffect, useState} from "react"
import { crearArchivo, subirImg, obtenerPost, crearPost } from "../firebase/configFirestore"
import ImageMessage from "../componentes/ImageMessage"
import {v4} from "uuid"
import { IoCloudUploadOutline } from "react-icons/io5"





function IndexAgregar() {

  const [files, setFiles] = useState()
  const [preview,setPreview] = useState(null)
  const [postImages,setPostImages] = useState([])
  const [formValues, setFormValues] = useState ({
    email:"",
    mensaje:""
  })

  

  useEffect(()=>{

    if(!files) return

    let temp = []
    for(let i=0; i<files.length; i++){
      temp.push(URL.createObjectURL(files[i]))
      
    }
    const objUrls = temp
    setPreview(objUrls)

    for(let i=0; i<objUrls.length; i++){
      return ()=>{
        URL.revokeObjectURL(objUrls[i])
      }
    }

  },[files])

  useEffect(()=>{
    obtenerPost()
 },[])

  
  const handleImputChange = (e) =>{
    const {name,value} = e.target
    setFormValues({
      ...formValues,
      [name]:value,
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log(formValues)
    let postImgs = []
    if(!files) return
    for(let i=0; i<files.length; i++){
      try {
        const res= await subirImg(files[i])
        console.log(res)
        postImages.push(res.url)
        await crearArchivo(res.uuid,res.url,files[i].name)
        
      } catch (error) {
        alert(error)
      }
      if(files[i]===files[files.length-1]){
        alert("Imagen(es) agregada(s) correctamente")
      }  
    }
    setPostImages(postImgs)
    console.log(postImages)
    try {
      let uuid = v4()
       await crearPost(uuid,formValues.email,formValues.mensaje,postImages)
    } catch (error) {
      alert(error)
    }
    
    setPostImages([])
    setPreview(null)
    obtenerPost()
    e.target.reset()
    
  }

  return (
    <div>
      
      <form className="form-control mt-5 pb-3 m-auto w-75" onSubmit={handleSubmit}>
        
         <label className="form-control">
         E-mail: 
         <input type="email" name="email" className="form-control"  autoFocus onChange={handleImputChange} value={formValues.email} required/>
         </label>

         <label className="form-control">
         Escribe tu post:
         <textarea className="form-control" name="mensaje" rows={4} maxLength={200} onChange={handleImputChange} value={formValues.mensaje}/>
         </label>
         
         <div className="mt-1 text-center">
           {preview?preview.map((imagen,index)=>{
             return <img src={imagen} key={index} className="imgprev" alt="imagen"/>
           }):<ImageMessage/>
           }
         </div>
          
         <input type="file" className="form-control mt-1"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          onChange={e=>{
            if(e.target.files&&e.target.files.length>0){
              setFiles(e.target.files)
            }
          }} />  
         <button className="btn btn-outline-primary mt-3 float-end" >Subir <IoCloudUploadOutline />
         </button>
         
      </form>
    
    </div>
    
  )
}

export default IndexAgregar