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
import Funding from "../components/Funding";
import NGOList from "../pages/NGO/NGO";
import Bot from "../pages/chatbot/chatbot";


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
                path: '/your-dost',
                element: <Bot />
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
                path:"/devi",
                element:<Devi/>
            },
            {
                path: "/funding/:recipientId/:ngo",
                element: <Funding/>
            },
            {            
                path:"/books/:id",
                element:<SingleBook/>
            },
            {
                path :'/ngo',
                element:<NGOList/>
            },
            {
                path: 'track-your-emotion',
                element: <Result/>
            }
        ]
    },
]);
export default router;