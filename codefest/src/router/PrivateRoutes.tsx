import { Route } from "react-router-dom"
import { routes } from "./Routes"
import { Dashboard } from "../pages/dashboard/Dashboard"

export const PrivateRoutes = () => {

    return (
        <>
            <Route path={routes.dashboard} element={<Dashboard/>} />
        </>
    )
}
