import { Game } from "../components/game";
import { Header } from "../components/header";
import { Leaderboard } from "../components/leaderboard";
import { UserWalletInfo } from "../components/user-wallet-info";

export function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <Header />

      <div className="flex gap-4 flex-col md:flex-row">
        <UserWalletInfo />
        <Game />
      </div>

      <Leaderboard />
    </div>
  );
}
