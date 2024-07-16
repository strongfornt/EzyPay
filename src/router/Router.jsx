import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../pages/Home/Home";
import RootLayout from "../RootLayout/RootLayout";
import Login from "../pages/auhtentication/login/Login";
import Register from "../pages/auhtentication/register/Register";



 export const router = createBrowserRouter([
    {
        path:'/',
        element: <RootLayout/>,
        children: [
            {
                path:'/',
                element: <Home/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            }
        ]
    }
])