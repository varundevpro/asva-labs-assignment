import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./index.css";
import { App } from "./App.tsx";

// Wallet
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createConfig, WagmiProvider, http } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { testChain } from "./utils/testChain.ts";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { injectedWallet, rainbowWallet } from "@rainbow-me/rainbowkit/wallets";
import { createClient } from "viem";
import { HistoryProvider } from "./context/history.tsx";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [rainbowWallet, injectedWallet],
    },
  ],
  { appName: "Asva Labs Assignment", projectId: "RANDOM_PROJECT_ID" }
);

const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum, base, testChain],
  connectors,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HistoryProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </HistoryProvider>
  </StrictMode>
);
