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
    let user_data = localStorage.getItem('user_data');
    if(user_data) return;

    console.log("Connected:", connected);

    const fetchUser = async () => {
      if (connected && account?.address) {
        try {
          const response = await axios.get(`${BackendURL}/user/${account.address}`);

          if (response.status === 200) {
            console.log("User already exists");
            setUser(response.data.user);
            localStorage.setItem('user_data', JSON.stringify(response.data.user));
          } else {
            const user = {
              name: generateAnonymousUsername(),
              address: account.address,
            };
            const createResponse = await axios.post(`${BackendURL}/user`, user);
            if(createResponse.status === 201){
              console.log("User created successfully");
              setUser(createResponse.data.user);
              localStorage.setItem('user_data', JSON.stringify(createResponse.data.user));
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


  useEffect(()=>{
    let user_data = localStorage.getItem('user_data');
    if(user_data){
      user_data = JSON.parse(user_data)
      setUser(user_data)
    }
  }, [])


  return (
    <WalletContext.Provider value={{ user, setUser, isConnected: connected }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use Wallet Context
export const useWalletContext = () => useContext(WalletContext);
