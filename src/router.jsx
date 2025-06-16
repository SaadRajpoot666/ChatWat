import { createBrowserRouter, Outlet } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { NavBar } from "./components/Navbar";
import { SignUp } from "./pages/SignUp";
import { Terms } from "./pages/Terms";
import {Login }from "./pages/login"
import { Privacy } from "./pages/Privacy";
import { Verify } from "./pages/verify";
import { Contacts } from "./pages/Contacts";
export const router = createBrowserRouter([
    {path:'/', element:<Layout    />, children:[
        {index:true,element:<Landing   />},
        {path:"login",element:<Login   />},
        {path:"signup",element:<SignUp   />},
        {path:"terms",element:<Terms   />},
        {path:"privacy",element:<Privacy   />},
        {path:"verify-otp",element:<Verify   />},
        {path:"contacts",element:<Contacts   />},
    ]}
])

function Layout(){
    return <>
    <NavBar    />
    <Outlet   />
    </>
}