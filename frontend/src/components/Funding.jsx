import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Col, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useParams } from "react-router-dom";
import { Network, Provider } from "aptos";

export const provider = new Provider(Network.DEVNET);

function Funding() {
  const { account, signAndSubmitTransaction } = useWallet();
  const { recipientId, ngo } = useParams(); // Fetch recipient ID from URL params
  const [accountBalance, setAccountBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [transactionInProgress, setTransactionInProgress] = useState(false);

  const fetchAccountBalance = async () => {
    if (!account) return;
    try {
      const balanceResource = await provider.getAccountResource(
        account.address,
        "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
      );
      const balance = parseInt(balanceResource.data.coin.value, 10);
      setAccountBalance(balance / 100_000_000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAccountBalance();
  }, [account?.address]);

  const handleSendTransaction = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }
    if (!recipientId || !amount) {
      alert("Enter a valid amount to send.");
      return;
    }
    
    setTransactionInProgress(true);
    try {
      const payload = {
        function: "0x1::aptos_account::transfer",
        typeArguments: [],
        functionArguments: [recipientId, (parseFloat(amount) * 100_000_000).toString()],
      };

      const response = await signAndSubmitTransaction({ data: payload });
      await provider.waitForTransaction(response.hash);
      await fetchAccountBalance();
      alert("Transaction successful!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed!");
    } finally {
      setTransactionInProgress(false);
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-[100vh] flex-col">
      <h1 className="text-5xl font-extrabold mb-10 text-center">{ngo}</h1>

      {!account ? (
        <span>
          Please Connect Your wallet first
        </span>
      ) : (
        <>
          <div className="w-[50%] flex flex-col gap-4 mt-4">
            <Input 
              type="text" 
              value={recipientId} 
              disabled 
              style={{ backgroundColor: "#f3f3f3" }} 
            />
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in APT"
            />
          </div>

          <div className="mt-6">
            <h1 className="text-8xl font-extrabold">{accountBalance || 0}</h1>
          </div>

          <button
            className="mt-3 bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSendTransaction}
            disabled={transactionInProgress}
          >
            {transactionInProgress ? "Sending..." : "Send Transaction"}
          </button>
        </>
      )}
    </div>
  );
}

export default Funding;
