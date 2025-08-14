'use client'
import { useState, useEffect, useRef } from 'react'

export default function Page() {
  const [output, setOutput] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [connectionId, setConnectionId] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const outputEndRef = useRef<HTMLDivElement>(null)

  const connectLocal = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/tools/server-shell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'local' })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Connection failed')

      setConnectionId(data.connectionId)
      setIsConnected(true)
      addToOutput(data.message)
    } catch (error) {
      addToOutput(`Error: ${error instanceof Error ? error.message : 'Failed'}`)
    } finally {
      setLoading(false)
    }
  }

  const executeCommand = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !isConnected || !connectionId) return

    addToOutput(`$ ${input}`)
    const cmd = input
    setInput('')

    try {
      const response = await fetch('/api/tools/server-shell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'command', command: cmd, connectionId })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Command failed')

      addToOutput(data.output.trim())
    } catch (error) {
      addToOutput(`Error: ${error instanceof Error ? error.message : 'Failed'}`)
    }
  }

  const disconnect = async () => {
    if (!connectionId) return
    await fetch('/api/tools/server-shell', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'disconnect', connectionId })
    })
    setIsConnected(false)
    setConnectionId(null)
    addToOutput('Disconnected.')
  }

  const addToOutput = (text: string) => {
    setOutput(prev => [...prev, text])
  }

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [output])

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          <span className="text-green-600">$</span> Server Shell
        </h1>

        {!isConnected ? (
          <div className="mb-8">
            <button
              onClick={connectLocal}
              disabled={loading}
              className="px-6 py-3 bg-background border rounded-md font-medium hover:bg-accent transition-colors disabled:opacity-50"
            >
              <span className="text-green-600">Connect Locally</span> (192.168.1.158)
            </button>
          </div>
        ) : (
          <div className="mb-4 flex justify-between items-center">
            <p>Connected locally</p>
            <button
              onClick={disconnect}
              className="text-red-500 hover:text-red-400"
            >
              Disconnect
            </button>
          </div>
        )}

        <div className="bg-background border rounded-md p-4 h-96 overflow-y-auto font-mono text-sm mb-4">
          {output.length === 0 ? (
            <p className="text-muted-foreground">
              {loading ? 'Connecting...' : 'Output will appear here'}
            </p>
          ) : (
            output.map((line, i) => (
              <p key={i} className={line.startsWith('$') ? 'text-green-600' : ''}>
                {line}
              </p>
            ))
          )}
          <div ref={outputEndRef} />
        </div>

        {isConnected && (
          <form onSubmit={executeCommand} className="flex gap-2">
            <span className="text-green-600">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-background border-b px-2 py-1 focus:outline-none"
              placeholder="Enter command..."
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading || !input.trim()}
              className="text-green-600 hover:text-green-500 disabled:opacity-50"
            >
              Run
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
