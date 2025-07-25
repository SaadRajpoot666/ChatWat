import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { UserProvider } from "./context/UserContext"; 

createRoot(document.getElementById("root")).render(
  <UserProvider> {/*  Wrap app with context */}
    <RouterProvider router={router} />
  </UserProvider>
);
