import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "../layout"
import { routes } from "./Routes"
import { Root } from "../pages/root/Root"
import { Login } from "../pages/login/Login"
import { Register } from "../pages/register/Register"

export const AppRoutes = () => {

const { user, rol } = useAuth();

    return (
		<BrowserRouter>
            <Routes>
    			<Route path={routes.login} element={<Login/>} />
    			<Route path={routes.register} element={<Register/>} />
				<Route element={<Layout/>}>
        			{
            			(user) ?? <PrivateRoutes/>
        			}
        			{
            			(rol == 0) ?? <ProtectedRoutes/>
        			}
        			<Route path={routes.root} element={<Root/>} />
    			</Route>
				<Route path={routes.errors.E404} element={<Error404 />} />
				<Route path={routes.errors.E500} element={<Error500 />} />
				<Route path="*" element={<Navigate to={routes.errors.E404} />} />
            </Routes>
        </BrowserRouter>
    )
}
