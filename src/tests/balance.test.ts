import { MAINNET_NODE_URL, TESTNET_NODE_URL, getAlphBalance } from '@/lib'

const TEST_ADDRESS = '1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH'

describe('Constants', () => {
  it('should have correct mainnet URL', () => {
    expect(MAINNET_NODE_URL).toBe('https://node.mainnet.alephium.org')
  })

  it('should have correct testnet URL', () => {
    expect(TESTNET_NODE_URL).toBe('https://node.testnet.alephium.org')
  })
})

describe('getBalance', () => {
  describe('getBalance', () => {
    it('should throw error for empty address', async () => {
      await expect(getAlphBalance('')).rejects.toThrow('Invalid address')
    })

    it('should throw error for null address', async () => {
      await expect(getAlphBalance(null as unknown as string)).rejects.toThrow(
        'Invalid address'
      )
    })

    it('should throw error for undefined address', async () => {
      await expect(
        getAlphBalance(undefined as unknown as string)
      ).rejects.toThrow('Invalid address')
    })
  })
})

describe('Integration tests', () => {
  const KNOWN_ADDRESS = TEST_ADDRESS

  it('should fetch balance for a valid mainnet address', async () => {
    try {
      const result = await getAlphBalance(KNOWN_ADDRESS)

      expect(result).toHaveProperty('address', KNOWN_ADDRESS)
      expect(result).toHaveProperty('balance')
      expect(result).toHaveProperty('balanceHint')
      expect(typeof result.balance).toBe('string')
    } catch (error) {
      if (error instanceof Error && error.message.includes('rate')) {
        console.log('Skipping integration test due to rate limiting')
        return
      }
      throw error
    }
  }, 10000)

  it('should handle invalid address format', async () => {
    await expect(getAlphBalance('invalid-address-format')).rejects.toThrow()
  }, 10000)
})
