import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Devi from "../pages/Devi/Devi";
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

const emotionData = [
    { timestamp: "2025-01-01T10:00:00", emotion: "happy", score: "95.38" },
    { timestamp: "2025-01-01T11:00:00", emotion: "sad", score: "10.25" },
    { timestamp: "2025-01-01T12:00:00", emotion: "angry", score: "5.63" },
    { timestamp: "2025-01-01T13:00:00", emotion: "happy", score: "88.25" },
    { timestamp: "2025-01-01T14:00:00", emotion: "fear", score: "50.63" },
    { timestamp: "2025-01-01T15:00:00", emotion: "neutral", score: "20.45" }
];


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
                path :"/state",
                element: <MentalState/>
            },
            {
                path :"/assessment",
                element: <Session/>
            },
            {
                path :"/dashboard",
                element: <Chart data={emotionData} />
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
            },{
                path:"/Devi",
                element:<Devi/>
            }
        ]
    },
]);
export default router;