'use client'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'

export default function Page() {
  const [clientInfo, setClientInfo] = useState<any>(null)
  const [ipInfo, setIpInfo] = useState<any>(null)
  const [customIp, setCustomIp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchClientInfo = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/sys-info')
      const data = await res.json()
      setClientInfo(data.client)
    } catch (err) {
      setError('Failed to fetch client info')
    } finally {
      setLoading(false)
    }
  }

  const fetchIpInfo = async (ip: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`https://ipapi.co/${ip}/json/`)
      if (!res.ok) throw new Error('IP lookup failed')
      const data = await res.json()
      setIpInfo(data)
    } catch (err) {
      setError('Invalid IP or lookup failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClientInfo()
  }, [])

  return (
    <div className="min-h-screen   font-mono p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold border-b  pb-2">
          <span className="">{">"}</span> System Information Tool
        </h1>

        {/* Client Info Section */}
        <Card className=" border bg-background p-6">
          <h2 className="text-xl font-semibold mb-4">Your Connection Info</h2>
          {loading && !clientInfo ? (
            <p className="animate-pulse">Loading your info...</p>
          ) : clientInfo ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-mono text-green-300">$ ip info</h3>
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(clientInfo.ip, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className="font-mono text-green-300">$ geo data</h3>
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(clientInfo.geo, null, 2)}
                </pre>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-mono text-green-300">$ headers</h3>
                <pre className="text-sm overflow-x-auto max-h-60">
                  {JSON.stringify(clientInfo.headers, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <p>No client information available</p>
          )}
        </Card>

        {/* IP Lookup Section */}
        <Card className=" border bg-background p-6">
          <h2 className="text-xl font-semibold mb-4">IP Lookup Tool</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              value={customIp}
              onChange={(e) => setCustomIp(e.target.value)}
              placeholder="Enter IP address"
              className="flex-1  border  p-2 rounded  focus:outline-none focus:ring-1 focus:ring-green-400"
            />
            <button
              onClick={() => fetchIpInfo(customIp)}
              disabled={!customIp || loading}
              className="  border  px-4 py-2 rounded hover:bg-green-400 hover:text-black disabled:opacity-50"
            >
              Lookup IP
            </button>
          </div>

          {error && (
            <div className="mb-4 p-2  text-red-400 border border-red-400 rounded">
              ! {error}
            </div>
          )}

          {loading && ipInfo === null ? (
            <p className="animate-pulse">Fetching IP data...</p>
          ) : ipInfo ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-mono text-green-300">$ ip details</h3>
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify({
                    ip: ipInfo.ip,
                    version: ipInfo.version,
                    city: ipInfo.city,
                    region: ipInfo.region,
                    country: ipInfo.country_name,
                    postal: ipInfo.postal,
                    latitude: ipInfo.latitude,
                    longitude: ipInfo.longitude,
                    timezone: ipInfo.timezone,
                  }, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className="font-mono text-green-300">$ network info</h3>
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify({
                    asn: ipInfo.asn,
                    org: ipInfo.org,
                    isp: ipInfo.org,
                    currency: ipInfo.currency,
                    languages: ipInfo.languages,
                  }, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Enter an IP address to lookup</p>
          )}
        </Card>
      </div>
    </div>
  )
}