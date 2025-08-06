import { defineChain } from 'viem'

export const testChain = defineChain({
  id: 685685,
  name: 'Gensyn Testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://gensyn-testnet.g.alchemy.com/public'] },
  },
  blockExplorers: {
    default: { name: 'Alchemy testnet explorer', url: 'https://gensyn-testnet.explorer.alchemy.com/' },
  },
  testnet: true,
  contracts: {

  },
})