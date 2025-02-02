import { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import axios from 'axios';
import { set } from "react-hook-form";

const WalletContext = createContext({
  user: null,
  isConnected: false,
});

const BackendURL = import.meta.env.VITE_BACKEND_URL;

function generateAnonymousUsername() {
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number
  return `AnonymousUser${randomNumber}`;
}

export const WalletProvider = ({ children }) => {
  const { account, connected, connect } = useWallet();
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Connected:", connected);

    const fetchUser = async () => {
      if (connected && account?.address) {
        try {
          const response = await axios.get(`${BackendURL}/user/${account.address}`);

          if (response.status === 200) {
            console.log("User already exists");
            setUser(response.data.user);
          } else {
            const user = {
              name: generateAnonymousUsername(),
              address: account.address,
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
