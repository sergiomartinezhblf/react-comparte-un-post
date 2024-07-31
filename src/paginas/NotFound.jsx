import { TbError404Off } from "react-icons/tb";


export default function NotFound() {
  return (
    <>
    <div className="mt-5 text-center"><h1>No se encontro la pagina</h1></div>
    <div className="text-center"><h2><i>Error 404</i></h2></div>
    <div className="imgError m-0 p-0 text-center"><TbError404Off /></div>
    </>
  )
}
