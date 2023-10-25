import { FC } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./components/Nabar"

export const Layout: FC = () => {
    return (
        <div>
            <Navbar/>
            <Outlet />
        </div>
    )
}
