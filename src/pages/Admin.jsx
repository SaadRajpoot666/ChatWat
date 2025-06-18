import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/AdminSidebar";
import { AdminUserTable } from "../components/AdminUserTable";
import { Dashboard } from "./AdminDashboard";
import { AdminMessages } from "./AdminMessages";

export const Admin = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  if (!isAdmin) {
    return (
      <div className="text-center text-red-600 font-bold mt-20">
        ⛔ Unauthorized Access
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 relative">
      {/* Header */}
      <header className="bg-green-900 z-50 text-white p-4 flex justify-between items-center sticky top-0 ">
        <h2 className="text-2xl font-bold uppercase">ChatWat Admin Panel</h2>
        <div className="flex items-center gap-4">
          {/* Hamburger toggle on mobile */}

          <button
            onClick={handleLogout}
            className="hidden md:inline-block bg-white text-green-900 px-4 py-2 rounded hover:bg-green-100 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <Sidebar usersid={"userTable"} dashId={"dashboard"} messages={"messages"} />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 md:ml-48">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-6 uppercase text-center">
            🛡️ Welcome Admin
          </h1>

          <div className="bg-white p-4 md:p-6 rounded shadow-md mb-6">
            <p className="text-gray-700 text-lg">
              📌 This is your admin dashboard. Here you can manage users, view
              chat activities, and control access.
            </p>
          </div>
          <section>
            <Dashboard dashId={"dashboard"} />
          </section>
          <section>
            <AdminUserTable table={"userTable"} />
          </section>
          <section className="mt-[10%]" >
            <AdminMessages   messageId={"messages"}  />
          </section>
        </main>
      </div>
    </div>
  );
};
