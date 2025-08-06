import { Route, Routes } from "react-router";
import { NotFoundPage } from "./pages/404";
import { HistoryPage } from "./pages/history";
import { HomePage } from "./pages/home";
import { LeaderboardPage } from "./pages/leaderboard";

export function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="history" element={<HistoryPage />} />
      <Route path="leaderboard" element={<LeaderboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
