import { Header } from "../components/header";
import { Leaderboard } from "../components/leaderboard";

export function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header />

      <div className="flex-1 max-w-7xl px-2 mx-auto">
        <Leaderboard />
      </div>
    </div>
  );
}
