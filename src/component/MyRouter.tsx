import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import  Groups  from "../pages/Groups";
import Layout  from "../pages/Layout";
import AddGroup  from "../pages/AddGroup";
import MyError from "../pages/MyError";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, 
        children: [
            {
                path: "",
                element: <Groups />, 
            },
            {
                path: "add-group",
                element: <AddGroup />, 
            },
            {
                path: "*",
                element: <MyError />, 
            },
        ],
    },
]);

