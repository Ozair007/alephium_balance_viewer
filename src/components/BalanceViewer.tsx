import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { getAlphBalance } from '@/lib'
import type { BalanceResult } from '@/types'
import { toast } from 'sonner'

function BalanceViewer() {
  const [address, setAddress] = useState<string>('')
  const [balance, setBalance] = useState<BalanceResult | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const result: BalanceResult = await getAlphBalance(address)
      setBalance(result)
      toast.success('Balance fetched successfully')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-10">Alephium Balance Viewer</h1>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Get Balance</CardTitle>
          <CardDescription>Enter ALPH address to get balance</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x..."
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={!address || loading}>
              Get Balance
            </Button>
          </form>
        </CardContent>
        {balance && (
          <CardFooter className="flex flex-col gap-2 flex-wrap">
            <p>Balance: {balance?.balance}</p>
            <p>Balance Hint: {balance?.balanceHint}</p>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

export default BalanceViewer
