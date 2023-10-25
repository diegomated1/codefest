import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "../layout"
import { routes } from "./Routes"
import { Root } from "../pages/root/Root"
import { Login } from "../pages/login/Login"
import { Register } from "../pages/register/Register"
import { ConfigGroup } from "../pages/configroup/ConfigGroup"
import { useAuth } from "../context/AuthProvider"
import { Error404 } from "../pages/errors/Error404"
import { Error500 } from "../pages/errors/Error500"
import { PrivateRoutes } from "./PrivateRoutes"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { TeamCreator } from "../pages/teamCreator/TeamCreator"
import { ConfigGroupAdmin } from "../pages/configroupadmin/ConfigGroupAdmin"

export const AppRoutes = () => {

	const { user, rol } = useAuth();

	return (
		<BrowserRouter>
			<Routes>
				<Route path={routes.login} element={<Login />} />
				<Route path={routes.register} element={<Register />} />
				<Route path={routes.configroup} element={<ConfigGroup />} />
				<Route path={routes.configroupadmin} element={<ConfigGroupAdmin />} />
				<Route element={<Layout />}>
					{
						(!user) ?? <Route element={<PrivateRoutes/>} />
					}
					{
						(rol == 0) ?? <Route element={<ProtectedRoutes />} />
					}
					            <Route path={routes.teamCreator} element={<TeamCreator/>} />

					<Route path={routes.root} element={<Root />} />
				</Route>
				<Route path={routes.errors.E404} element={<Error404 />} />
				<Route path={routes.errors.E500} element={<Error500 />} />
				<Route path="*" element={<Navigate to={routes.errors.E404} />} />
			</Routes>
		</BrowserRouter>
	)
}
