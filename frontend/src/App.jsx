import { Outlet } from "react-router"
import "./App.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { WalletProvider } from "./context/WalletContext";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";


function App() {
  

  return (
    <AptosWalletAdapterProvider>
      <WalletProvider>
      <div className="bg-white flex flex-col w-full">
        < Navbar/>
        <main className="min-h-screen bg-white">
          <Outlet/>
        </main>
        <Footer/>
      </div>
      </WalletProvider>
    </AptosWalletAdapterProvider>
  )
}
export default App;
