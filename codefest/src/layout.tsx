import { FC } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./components/Nabar"
import ChatSideBar from "./components/ChatSideBar/ChatSideBar"

export const Layout: FC = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}
