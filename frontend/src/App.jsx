import { Outlet } from "react-router"
import "./App.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Network } from "aptos";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { WalletProvider } from "./context/WalletContext";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

const wallets = [new PetraWallet()];

function App() {
  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={false}
      dappConfig={{
        network: Network.DEVNET,
      }}
    >
      <WalletProvider>
      <div className="bg-white flex flex-col w-full min-h-screen">
        < Navbar/>
        <main className="bg-white">
          <Outlet/>
        </main>
        <Footer/>
      </div>
      </WalletProvider>
    </AptosWalletAdapterProvider>
  )
}
export default App;
