import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/Books/CartPage";
import Checkout from "../pages/Books/CheckoutPage";
import SingleBook from "../pages/Books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import Session from "../components/session";
import Chart from "../charts/line_chart";
import MentalState from "../charts/progress_circle";
import SafeSpace from "../pages/SafeSpace/SafeSpace";
import PostPage from "../pages/SafeSpace/Post";
import Consultant from "../pages/Consultant/Consultant";


const router =createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path :'/',
                element:<Home/>
            },
            {
                path :"/safespace",
                element: <SafeSpace/>
            },
            {
                path:"/safespace/:id",
                element:<PostPage/>
            },
            {
                path :"/state/:mental_state/:confidence",
                element: <MentalState/>
            },
            {
                path :"/assessment",
                element: <Session/>
            },
            {
                path :"/dashboard/:user_id",
                element: <Chart />
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
                path:"/register",
                element:<Register/>
            },
            {
                path:"/cart",
                element:<CartPage/>
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