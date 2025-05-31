import { Outlet } from "react-router-dom"
import Navbar from "../components/Admin/AdminNavbar"

const AdminLayout = () => {
  return (
    <div>
      <Navbar/>
        <Outlet/>
    </div>
  )
}

export default AdminLayout