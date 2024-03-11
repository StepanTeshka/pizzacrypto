import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

// Get projectId at https://cloud.walletconnect.com
export const projectId = "6d6f1164282c3ea317201fe668bb4e14"

export const addressContract = "0x6ae2Ec20264DfC6418C769b266dd9DE95926bFE5"

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
    name: 'BlockChats',
    description: '',
    url: 'https://blockchats.ru/', 
    icons: ["../../app/favicon.ico"]
  }
  
  export const config = defaultWagmiConfig({
    chains: [sepolia], 
    projectId, 
    metadata, 
    ssr: true,
    storage: createStorage({
      storage: cookieStorage
    }),
    enableWalletConnect: true,
  })

