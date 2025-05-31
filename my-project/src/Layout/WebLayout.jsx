import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"



const WebLayout = () => {
  return (
    <div>
      <Navbar/>
        <Outlet/>
    </div>
  )
}

export default WebLayout