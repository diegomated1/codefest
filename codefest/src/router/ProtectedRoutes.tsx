import { Route } from "react-router-dom"
import { routes } from "./Routes"
import { UsersEdit } from "../pages/usersEdit/UsersEdit"

export const ProtectedRoutes = () => {

    return (
        <>
            <Route path={routes.users.edit} element={<UsersEdit/>} />
        </>
    )
}
