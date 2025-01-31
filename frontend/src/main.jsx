import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router"
import router from './routers/router.jsx'
import {Provider } from 'react-redux'
import {store} from './redux/store.js'

import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "aptos";

const wallets = [new PetraWallet()];
createRoot(document.getElementById('root')).render(


<Provider store={store}>
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={false}
      dappConfig={{ network: Network.DEVNET, aptosConnectDappId: "dapp-id" }}
    >
      <RouterProvider router={router}/>
    </AptosWalletAdapterProvider>
  </Provider>

)
