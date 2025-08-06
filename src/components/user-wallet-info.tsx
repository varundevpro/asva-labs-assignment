import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { useTotalXP } from "../context/history";
import { getGameLevel } from "../utils/game";

export function UserWalletInfo() {
  const { address } = useAccount();
  const totalXp = useTotalXP();
  const b = useBalance({ address });

  const balance = `${b.data?.formatted || ""} ${b.data?.symbol || ""}`;
  const totalXpFormatted = new Intl.NumberFormat("en").format(totalXp || 0);

  return (
    <div className="relative bg-white p-4 flex flex-2/3 justify-between items-center rounded-xl shadow-lg overflow-hidden">
      <dl className="info-card gap-2 text-gray-900 w-full">
        <div className="balance p-4 gap-1 flex flex-col-reverse items-start border-b border-b-gray-200">
          <dt className="text-5xl font-medium">{balance.trim() || "0 ETH"}</dt>
          <dd className="text-gray-500">Balance</dd>
        </div>
        <div className="xp p-4 gap-1 flex flex-col items-start">
          <dt className="text-3xl font-medium">{totalXpFormatted}</dt>
          <dd className="text-gray-500">XP Collected</dd>
        </div>
        <div className="rank p-4 gap-1 flex flex-col items-start">
          <dt className="text-3xl font-medium">{getGameLevel(totalXp)}</dt>
          <dd className="text-gray-500">Level</dd>
        </div>
        <div className="chain p-4 gap-1 flex flex-col items-start">
          <dt className="text-3xl font-medium">
            {address?.slice(0, 8) ?? "0x123456"}...
          </dt>
          <dd className="text-gray-500">Address</dd>
        </div>
      </dl>

      {!address && (
        <div className="absolute inset-0 bg-white/45 backdrop-blur-sm flex items-center justify-center">
          <ConnectButton />
        </div>
      )}
    </div>
  );
}
