import { Outlet } from "react-router"
import "./App.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { AuthProvider } from "./context/AuthContext"


function App() {
  

  return (
    
    <div className="bg-white relative w-full">
    <AuthProvider>
      <div id="header" className="sticky top-4 z-20">
        < Navbar/>
      
      </div>
      <main className="min-h-screen bg-white">
        <Outlet/>
      </main>
      <Footer/>
    </AuthProvider>
    </div>
  )
}
export default App;
