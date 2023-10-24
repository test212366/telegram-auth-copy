import { Route, Routes } from "react-router"
import { router } from "../types/router"
import { publicRoutes } from "../utils"
import Auth from "./Auth"
 
const Router = () => {
	const auth = false
	
	return (
		<>
			<Routes>

				{auth ? '' : [...publicRoutes].map((rout:router, index:number) => 
					//@ts-ignore
					<Route path={rout.path} key={index} element={<rout.component   />} />
				)}
				<Route path="*" element={<Auth/>} />

			</Routes>
			 
		
		</>
	)
}	

export default Router