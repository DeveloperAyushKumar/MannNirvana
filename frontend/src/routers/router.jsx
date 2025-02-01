import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Devi/Devi";
import Login from "../components/Login";
import Register from "../components/Register";
import Checkout from "../pages/Books/CheckoutPage";
import SingleBook from "../pages/Books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import Session from "../components/session";
import SafeSpace from "../pages/SafeSpace/SafeSpace";
import PostPage from "../pages/SafeSpace/Post";
import Consultant from "../pages/Consultant/Consultant";
import Result from "../components/Result";
import Devi from "../pages/Devi/Devi";
import Profile from "../pages/Profile/Profile";


const router =createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path :'/',
                element:<SafeSpace/>
            },
            {
                path : '/profile',
                element:<Profile/>
            },
            {
                path:"/safespace/:id",
                element:<PostPage/>
            },
            {
                path :"/assessment",
                element: <Session/>
            },
            {
                path:"/consultant",
                element:<Consultant/>
            },
            {
                path:"/login",
                element:<Login/>

            }, 
            {
                path:"/result/:user_id/:mental_state/:confidence",
                element:<Result/>
            },
            {
                path:"/devi",
                element:<Devi/>
            },
            {
                path :"/checkout",
                element:<PrivateRoute><Checkout/></PrivateRoute>

            },
            {
                path:"/books/:id",
                element:<SingleBook/>
            }
            
        ]
    },
]);
export default router;