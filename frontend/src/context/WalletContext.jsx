import { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import axios from 'axios';
import { set } from "react-hook-form";

const WalletContext = createContext({
  user: null,
  isConnected: false,
});

const BackendURL = import.meta.env.VITE_BACKEND_URL;

export const WalletProvider = ({ children }) => {
  const { account, connected } = useWallet();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (connected && account?.address) {
        try {
          const response = await axios.get(`${BackendURL}/user/${account.address}`,{
            validateStatus: function (status) {
              return status >= 200 && status < 500; // Allows 2xx and 3xx status codes
            }
          });

          if (response.status === 200) {
            console.log("User already exists");
            setUser(response.data.user);
          } else {
            const user = {
              name: "Anonymous User",
              address: account.address,
              avatar:null
            };
            const createResponse = await axios.post(`${BackendURL}/user`, user);
            if(createResponse.status === 201){
              console.log("User created successfully");
              setUser(createResponse.data.user);
            }
            else{
              console.error("Error creating user:", createResponse.data.message);
              setUser(null);
            }
          }
        } catch (error) {
          console.error("Error fetching or creating user:", error);
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, [connected, account]);

  return (
    <WalletContext.Provider value={{ user, setUser, isConnected: connected }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use Wallet Context
export const useWalletContext = () => useContext(WalletContext);
