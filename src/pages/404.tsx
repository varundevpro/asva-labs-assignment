import { Header } from "../components/header";

export function NotFoundPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header />

      <div className="flex-1 items-center justify-center text-center">
        Page Not Found
      </div>
    </div>
  );
}
