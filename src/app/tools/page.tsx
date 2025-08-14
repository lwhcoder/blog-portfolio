'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie, getCookie, deleteCookie } from 'cookies-next'
import Link from 'next/link'

export default function ToolsPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(!!(typeof window !== 'undefined' && getCookie('tools-auth')))
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/tools/user')
      if (!response.ok) throw new Error('IP not authorized')
      
      const users = await response.json()
      const user = users.find(u => u.user === username && u.password === password)
      
      if (user) {
        setCookie('tools-auth', JSON.stringify(user), {
          maxAge: 60 * 60 * 24,
          path: '/tools',
          secure: process.env.NODE_ENV === 'production',
        })
        setIsLoggedIn(true)
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    deleteCookie('tools-auth', { path: '/tools' })
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen   font-mono p-8">
        <div className="max-w-4xl mx-auto border  rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              <span className="">{">"}</span> Admin Tools
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2   border  rounded hover:bg-green-400 hover:text-black"
            >
              logout
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border  p-4 rounded-lg">
              <h2 className="font-semibold mb-2">$ admin panel</h2>
              <p className="text-green-300">Access privileged functions</p>
            </div>
            <div className="border  p-4 rounded-lg">
              <h2 className="font-semibold mb-2">$ configuration</h2>
              <p className="text-green-300">System settings</p>
            </div>
            <Link href="/tools/sys-info">
            <div className="border  p-4 rounded-lg">
              <h2 className="font-semibold mb-2">$ sys info</h2>
              <p className="text-green-300">Access system information, using ip, or automated</p>
            </div>
            </Link>
            <Link href="/tools/server-shell">
            <div className="border  p-4 rounded-lg">
              <h2 className="font-semibold mb-2">$ server shell</h2>
              <p className="text-green-300">Access the home server&apos;s shell</p>
            </div>
            </Link>
                        <Link href="/tools/encryptor">
            <div className="border  p-4 rounded-lg">
              <h2 className="font-semibold mb-2">$ encryptor</h2>
              <p className="text-green-300">Encrypt and decrypt files</p>
            </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center   font-mono p-4">
      <div className="border  rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          <span className="">{">"}</span> tools login
        </h1>
        
        {error && (
          <div className="mb-4 p-2  text-red-400 border border-red-400 rounded text-sm">
            ! {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              $ username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2   border  rounded focus:outline-none focus:ring-1 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              $ password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2   border  rounded focus:outline-none focus:ring-1 focus:ring-green-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6   p-2 border  rounded hover:bg-green-400 hover:text-black disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-pulse">authenticating...</span>
            ) : (
              <>
                <span>login</span>
                <span>{">"}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}