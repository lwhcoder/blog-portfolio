'use client'

import React, { useState } from 'react'
import { ClipboardCopy, Check } from 'lucide-react'
import { Highlight, Language } from 'prism-react-renderer'
import clsx from 'clsx'

type Command = {
  label: string
  code: string
}

interface AdvancedCodeProps {
  type: 'code' | 'command'
  language?: Language
  code?: string
  commands?: Command[]
}

export function AdvancedCode({
  type,
  language = 'tsx',
  code = '',
  commands = [],
}: AdvancedCodeProps) {
  const [copied, setCopied] = useState(false)
  const [selectedCmd, setSelectedCmd] = useState(commands[0]?.label || 'npm')

  const toCopy =
    type === 'command'
      ? commands.find(c => c.label === selectedCmd)?.code || ''
      : code

  const handleCopy = async () => {
    await navigator.clipboard.writeText(toCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="bg-black border-2 rounded-md overflow-hidden font-mono text-sm">
      {/* Top bar: Language/Command selector + Copy button */}
      <div className="flex items-center justify-between px-4 pt-3">
        {/* Show either tabs for commands OR just the language label */}
        {type === 'command' ? (
          <div className="flex space-x-2">
            {commands.map(({ label }) => (
              <button
                key={label}
                onClick={() => setSelectedCmd(label)}
                className={clsx(
                  'text-xs px-2 py-1 rounded transition-colors',
                  selectedCmd === label
                    ? 'bg-white text-black'
                    : 'text-white/50 hover:text-white'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        ) : (
          <span className="text-xs uppercase tracking-wide font-semibold bg-white text-black p-1 rounded px-2">
            {language}
          </span>
        )}

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="ml-auto text-white hover:text-green-400 transition"
        >
          {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
        </button>
      </div>

      {/* Code / Command Content */}
      <div className="px-4 py-3 overflow-x-auto">
        <Highlight code={toCopy.trim()} language={type === 'command' ? 'bash' : language}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="text-sm text-white">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span
                      key={key}
                      {...getTokenProps({ token })}
                      className={clsx(
                        token.types.includes('keyword') && 'text-purple-400',
                        token.types.includes('string') && 'text-green-400',
                        token.types.includes('function') && 'text-yellow-400',
                        token.types.includes('punctuation') && 'text-white',
                        token.types.includes('comment') && 'text-zinc-500',
                        token.types.includes('plain') && 'text-white'
                      )}
                    >
                      {token.content}
                    </span>
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}