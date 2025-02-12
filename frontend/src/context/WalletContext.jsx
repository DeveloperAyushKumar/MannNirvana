import { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import axios from 'axios';
import { decodeToken } from "../utils/decodeToken";

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
  const { account, connected } = useWallet();
  const [user, setUser] = useState(null);

  useEffect(()=>{
    console.log(user);
    const token = localStorage.getItem("token");
    if (token) {
        const response = decodeToken(token);
        if (response?.status === 200) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          console.log(response.user);
          setUser(response.user);
          return;
        } else {
          localStorage.removeItem("token");
        }
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) return;

        if (connected && account?.address) {
          const response = await axios.get(`${BackendURL}/user/${account.address}`);

          if (response.status === 200 && response.data.user) {
            console.log("User already exists");
            setUser(response.data.user);
            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
          } else {
            const newUser = {
              name: generateAnonymousUsername(),
              address: account.address,
            };

            const createResponse = await axios.post(`${BackendURL}/user`, newUser);
            if (createResponse.status === 201) {
              console.log("User created successfully");
              setUser(createResponse.data.user);
              localStorage.setItem("token", createResponse.data.token);
              axios.defaults.headers.common["Authorization"] = `Bearer ${createResponse.data.token}`;
            } else {
              console.error("Error creating user:", createResponse.data.message);
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching or creating user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, [connected, account?.address]);

  return (
    <WalletContext.Provider value={{ user, setUser, isConnected: connected }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use Wallet Context
export const useWalletContext = () => useContext(WalletContext);
