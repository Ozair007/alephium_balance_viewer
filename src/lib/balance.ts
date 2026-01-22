import type { BalanceResult } from '@/types'
import { NodeProvider } from '@alephium/web3'

export const MAINNET_NODE_URL = 'https://node.mainnet.alephium.org'
export const TESTNET_NODE_URL = 'https://node.testnet.alephium.org'

export async function getAlphBalance(address: string): Promise<BalanceResult> {
  if (!address || typeof address !== 'string') {
    throw new Error('Invalid address: address must be a non-empty string')
  }
  try {
    const nodeProvider = new NodeProvider(MAINNET_NODE_URL)
    const result =
      await nodeProvider.addresses.getAddressesAddressBalance(address)

    return {
      address,
      balance: result.balance,
      balanceHint: result.balanceHint,
    } as BalanceResult
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('400') || error.message.includes('Invalid')) {
        throw new Error(`Invalid Alephium address: ${address}`)
      }
      throw new Error(`Failed to fetch balance: ${error.message}`)
    }
    throw error
  }
}
