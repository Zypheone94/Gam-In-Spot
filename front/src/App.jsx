import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Category from "./components/Category.jsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <div>Hello world!</div>,
        },
        {
            path: "/test",
            element: <div>Hello test!</div>,
        },
        {
            path: "/category",
            element: <Category />,
        },
    ]);

    return (
        <RouterProvider router={router}/>
    );
}

export default App
