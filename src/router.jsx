import { createBrowserRouter, Outlet } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { NavBar } from "./components/Navbar";
import { SignUp } from "./pages/SignUp";
import { Terms } from "./pages/Terms";
import {Login }from "./pages/login"
import { Privacy } from "./pages/Privacy";
export const router = createBrowserRouter([
    {path:'/', element:<Layout    />, children:[
        {index:true,element:<Landing   />},
        {path:"login",element:<Login   />},
        {path:"signup",element:<SignUp   />},
        {path:"terms",element:<Terms   />},
        {path:"privacy",element:<Privacy   />},
    ]}
])

function Layout(){
    return <>
    <NavBar    />
    <Outlet   />
    </>
}