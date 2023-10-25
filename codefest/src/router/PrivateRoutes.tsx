import { Route } from "react-router-dom"
import { routes } from "./Routes"
import { Dashboard } from "../pages/dashboard/Dashboard"
import { TeamCreator } from "../pages/teamCreator/TeamCreator"

export const PrivateRoutes = () => {

    return (
        <>
            <Route path={routes.dashboard} element={<Dashboard/>} />
        </>
    )
}
