import { getAlphBalance } from './balance'

const address = process.argv[2]

if (!address) {
  console.error('Error: Address parameter is required')
  console.error('Usage: npx tsx src/lib/cli.ts <address>')
  process.exit(1)
}

getAlphBalance(address)
  .then((result) => {
    console.log('')
    console.log('Address:', result.address)
    console.log('Balance:', result.balance)
    console.log('Balance Hint:', result.balanceHint)
  })
  .catch((error) => {
    console.error('Error:', error.message)
    process.exit(1)
  })
