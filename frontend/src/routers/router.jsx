import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Checkout from "../pages/Books/CheckoutPage";
import SingleBook from "../pages/Books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import Session from "../components/session";
import MentalState from "../charts/progress_circle";
import SafeSpace from "../pages/SafeSpace/SafeSpace";
import PostPage from "../pages/SafeSpace/Post";
import Consultant from "../pages/Consultant/Consultant";
import Result from "../components/Result";
import Devi from "../pages/Devi/Devi";


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
                path:"/safespace/:id",
                element:<PostPage/>
            },
            {
                path :"/state",
                element: <MentalState/>
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