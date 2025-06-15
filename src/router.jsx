import { createBrowserRouter, Outlet } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { NavBar } from "./components/Navbar";

export const router = createBrowserRouter([
    {path:'/', element:<Layout    />, children:[
        {index:true,element:<Landing   />}
    ]}
])

function Layout(){
    return <>
    <NavBar    />
    <Outlet   />
    </>
}