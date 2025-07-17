"use client";
import { WalletMinimal } from "lucide-react";

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
      <h1 className="text-4xl font-semibold">BONFIRE</h1>
      <div className="flex flex-row space-x-4">
        <a
          className="px-4 py-2 text-gray-700 hover:text-gray-900 border-2 rounded-md hover:border-gray-900"
          href="/launchpad"
        >
          Launchpad
        </a>
         <CustomWalletButton />
      </div>
     
    </div>
  );
}

export function NavBar() {
  return <NavBarContent />;
}
