import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
export const Landing = () => {
  return (
    <div className="">
      <div className="flex justify-center items-center flex-col">
        <img src={logo} alt="logo" className="w-[60vw] md:w-[30vw]  " />
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-900">
          Welcome To ChatWat
        </h1>
        <p className="text-xl text-green-900 font-bold text-center">
          A real-time chat app with custom authentication, admin control, and
          blazing-fast messaging — built for teams, friends, and modern
          businesses.
        </p>
      </div>
      <div className="flex flex-row justify-center items-center gap-4 mt-4 " >

      <NavLink to={"/login"} className={"bg-green-800 text-white px-4 py-2 text-xl rounded-md hover:bg-white hover:text-green-800 hover:border-2 hover:border-green-800 duration-200 transition-all"}>Login</NavLink>

      <NavLink to={"/signup"} className={"bg-green-800 text-white px-4 py-2 text-xl rounded-md hover:bg-white hover:text-green-800 hover:border-2 hover:border-green-800 duration-200 transition-all"}>Signup</NavLink>
      </div>
    </div>
  );
};
