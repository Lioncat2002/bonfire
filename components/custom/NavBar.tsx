"use client";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletMinimal } from "lucide-react";

import { useMemo } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

function CustomWalletButton() {
  const { publicKey, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-sm border border-gray-400 hover:bg-gray-300"
    >
      <WalletMinimal />
      <span>
        {connected && publicKey
          ? `${publicKey.toBase58().slice(0, 4)}...${publicKey
              .toBase58()
              .slice(-4)}`
          : "Connect Wallet"}
      </span>
    </button>
  );
}

function NavBarContent() {
  return (
    <div className="flex flex-row justify-between p-4">
      <h1 className="text-4xl font-semibold">PARSEC</h1>
      <CustomWalletButton />
    </div>
  );
}

export function NavBar() {
  const endpoint = clusterApiUrl("mainnet-beta");

  const wallets = useMemo(() => [], []);

  return <NavBarContent />;
}
