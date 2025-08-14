'use client'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import * as crypto from 'crypto'

export default function EncryptorPage() {
  const [activeTab, setActiveTab] = useState<'generate'|'encrypt'|'decrypt'>('generate')
  const [key, setKey] = useState('')
  const [iv, setIV] = useState('')
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [copied, setCopied] = useState(false)

  const algorithm = 'aes-256-cbc'

  const generateKeys = () => {
    const newKey = crypto.randomBytes(32).toString('hex')
    const newIV = crypto.randomBytes(16).toString('hex')
    setKey(newKey)
    setIV(newIV)
    setOutputText(`🔑 Key: ${newKey}\n🧬 IV : ${newIV}`)
  }

  const handleEncrypt = () => {
    try {
      const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))
      let encrypted = cipher.update(inputText, 'utf8', 'hex')
      encrypted += cipher.final('hex')
      setOutputText(encrypted)
    } catch (err) {
      setOutputText('❌ Error during encryption. Check your key/IV.')
    }
  }

  const handleDecrypt = () => {
    try {
      const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))
      let decrypted = decipher.update(inputText, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      setOutputText(decrypted)
    } catch (err) {
      setOutputText('❌ Error during decryption. Check your input.')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen font-mono p-4 md:p-8">
      <Card className="bg-background border-2 max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-green-500">
            <pre className="text-xs md:text-sm">
              {`
███████╗███╗   ██╗ ██████╗██████╗ ██╗   ██╗████████╗ ██████╗ ██████╗ 
██╔════╝████╗  ██║██╔════╝██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔═══██╗██╔══██╗
█████╗  ██╔██╗ ██║██║     ██████╔╝ ╚████╔╝    ██║   ██║   ██║██████╔╝
██╔══╝  ██║╚██╗██║██║     ██╔══██╗  ╚██╔╝     ██║   ██║   ██║██╔══██╗
███████╗██║ ╚████║╚██████╗██║  ██║   ██║      ██║   ╚██████╔╝██║  ██║
╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝   ╚═╝      ╚═╝    ╚═════╝ ╚═╝  ╚═╝
              `.trim()}
            </pre>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-background border">
              <TabsTrigger 
                value="generate" 
                className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
                onClick={() => setActiveTab('generate')}
              >
                Generate
              </TabsTrigger>
              <TabsTrigger 
                value="encrypt"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
                onClick={() => setActiveTab('encrypt')}
              >
                Encrypt
              </TabsTrigger>
              <TabsTrigger 
                value="decrypt"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
                onClick={() => setActiveTab('decrypt')}
              >
                Decrypt
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="mt-4">
              <Button 
                onClick={generateKeys}
                className="w-full bg-green-500 text-black hover:bg-green-600"
              >
                Generate New Key + IV
              </Button>
            </TabsContent>

            <TabsContent value="encrypt" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="encrypt-text">Text to Encrypt</Label>
                <Textarea
                  id="encrypt-text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="  text-green-500"
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="encrypt-key">Key (64-char hex)</Label>
                  <Input
                    id="encrypt-key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="  text-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="encrypt-iv">IV (32-char hex)</Label>
                  <Input
                    id="encrypt-iv"
                    value={iv}
                    onChange={(e) => setIV(e.target.value)}
                    className="  text-green-500"
                  />
                </div>
              </div>
              <Button 
                onClick={handleEncrypt}
                className="w-full bg-green-500 text-black hover:bg-green-600"
              >
                Encrypt
              </Button>
            </TabsContent>

            <TabsContent value="decrypt" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="decrypt-text">Text to Decrypt</Label>
                <Textarea
                  id="decrypt-text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="  text-green-500"
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="decrypt-key">Key (64-char hex)</Label>
                  <Input
                    id="decrypt-key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="  text-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="decrypt-iv">IV (32-char hex)</Label>
                  <Input
                    id="decrypt-iv"
                    value={iv}
                    onChange={(e) => setIV(e.target.value)}
                    className="  text-green-500"
                  />
                </div>
              </div>
              <Button 
                onClick={handleDecrypt}
                className="w-full bg-green-500 text-black hover:bg-green-600"
              >
                Decrypt
              </Button>
            </TabsContent>
          </Tabs>

          {outputText && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between items-center">
                <Label>Output</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="text-green-500  hover:bg-green-500/10"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <pre className="p-4  border  rounded-md overflow-x-auto text-sm">
                {outputText}
              </pre>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button 
            variant="outline" 
            className="text-green-500  hover:bg-green-500/10"
            onClick={() => {
              setKey('')
              setIV('')
              setInputText('')
              setOutputText('')
              setActiveTab('generate')
            }}
          >
            Reset All
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}