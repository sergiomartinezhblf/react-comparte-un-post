// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getFirestore, collection, addDoc, getDocs, query, orderBy} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from "uuid"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3NYV6qhInyFrv5gr72WOnoh9tYpnG14M",
  authDomain: "archivo-galeria-imagenes-react.firebaseapp.com",
  projectId: "archivo-galeria-imagenes-react",
  storageBucket: "archivo-galeria-imagenes-react.appspot.com",
  messagingSenderId: "161488951490",
  appId: "1:161488951490:web:a2a856b28b108b9807c35b",
  measurementId: "G-MJX54DGZP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)

const db = getFirestore(app);

export const crearArchivo = async (uuidImg,url,nombre) =>{
    try {
         const docRef = await addDoc(collection(db,"imagenes"),{
             uuidImg: uuidImg,
             urlImg: url,
             nombre: nombre,
             creacion: new Date()
         })
         console.log("Document written with ID: ", docRef.id)
 
    } catch (error) {
     console.error("Error adding document: ", error)   
    }
 }

 export const crearPost = async (uuid,email,mensaje,imagenes) =>{
    try {
         const docRef = await addDoc(collection(db,"post"),{
             uuid,
             email,
             mensaje,
             imagenes,
             creacion: new Date()
         })
         console.log("Document written with ID: ", docRef.id)
 
    } catch (error) {
     console.error("Error adding document: ", error)   
    }
 }



 export const subirImg = async (file) =>{
    let uuid = v4()
    const storageRef = ref(storage,uuid)
     await uploadBytes(storageRef,file)
     const url = await getDownloadURL(storageRef)
     return {url,uuid}

}

export const obtenerDocs = async () =>{

    let archivos = []
    const postRef = collection(db, "post");

    const querySnapshot = await getDocs(postRef)

    querySnapshot.forEach(doc=>{
        const archivo = {
            uuid: doc.data().uuid,
            email: doc.data().email,
            imagenes: doc.data().imagenes,
            mensaje: doc.data().mensaje,
            creacion: doc.data().creacion.toDate()
        }
        
        archivos.push(archivo)
        
    })
    console.log(archivos)

    return archivos
}

export const obtenerPost = async() =>{

   let archivos = []
   const postRef = collection(db, "post");
   const q = query(postRef, orderBy("creacion","desc"));

   const querySnapshot = await getDocs(q)

   querySnapshot.forEach(doc=>{
       const archivo = {
           uuid: doc.data().uuid,
           email: doc.data().email,
           imagenes: doc.data().imagenes,
           mensaje: doc.data().mensaje,
           creacion: doc.data().creacion.toDate()
       }
       
       archivos.push(archivo)
       
   })
   console.log(archivos)

   return archivos

}