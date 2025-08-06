import { Header } from "../components/header";
import { History } from "../components/history";

export function HistoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header />

      <div className="flex-1 max-w-xl mx-auto w-full">
        <History />
      </div>
    </div>
  );
}
