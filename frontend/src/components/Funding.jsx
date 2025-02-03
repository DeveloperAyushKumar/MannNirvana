import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Input, Spin, Alert } from "antd";
import React, { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useParams } from "react-router-dom";
import { Network, Provider } from "aptos";

export const provider = new Provider(Network.DEVNET);

function Funding() {
  const { account, signAndSubmitTransaction } = useWallet();
  const { recipientId, ngo } = useParams();
  const [accountBalance, setAccountBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
      setError("Failed to fetch account balance.");
    }
  };

  useEffect(() => {
    fetchAccountBalance();
  }, [account?.address]);

  const handleSendTransaction = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!account) {
      setError("Please connect your wallet first.");
      return;
    }
    if (!recipientId || !amount) {
      setError("Enter a valid amount to send.");
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
      setSuccessMessage("Transaction successful!");
    } catch (error) {
      setError("Transaction failed! Please try again.");
    } finally {
      setTransactionInProgress(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="bg-white hover:shadow-2xl shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">{ngo}</h1>

        {!account ? (
          <>   
          <div className='flex flex-col gap-4'>
          <Alert message="Please connect your wallet first" type="warning" showIcon />
          <WalletSelector  />
            </div>       
            
          </>
        ) : (
          <>
            {error && <Alert message={error} type="error" showIcon className="mb-4" />}
            {successMessage && <Alert message={successMessage} type="success" showIcon className="mb-4" />}

            <div className="flex flex-col gap-4">
              <Input value={recipientId} disabled className="bg-gray-200 cursor-not-allowed" />
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount in APT"
              />
            </div>

            <div className="text-center mt-6">
              <h2 className="text-4xl font-bold">{accountBalance.toFixed(2)} APT</h2>
              <p className="text-gray-500 text-sm">Available Balance</p>
            </div>

            <button
              className={`mt-4 w-full py-2 rounded-lg text-white font-semibold transition ${
                transactionInProgress ? "bg-gray-400 cursor-not-allowed" : "bg-dark hover:bg-extraDark"
              }`}
              onClick={handleSendTransaction}
              disabled={transactionInProgress}
            >
              {transactionInProgress ? <Spin /> : "Send Transaction"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Funding;
