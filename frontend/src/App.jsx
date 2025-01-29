import { Outlet } from "react-router"
import "./App.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { AuthProvider } from "./context/AuthContext"
function App() {
  

  return (
    
    <div className="bg-customGray relative w-full">
    <AuthProvider>
      <div className=" sticky top-4  ">
    < Navbar/>
      </div>
<main className="min-h-screen bg-customGray mt-10">
  <Outlet/>
</main>
 <Footer/>
    </AuthProvider>
    </div>
  )
}
export default App;
