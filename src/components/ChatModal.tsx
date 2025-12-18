import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, ThumbsUp, ThumbsDown, Mic, Image as ImageIcon, RotateCcw } from 'lucide-react'

type Message = {
  id: string
  from: 'user' | 'bot'
  text: string
  ts: number
}

export default function ChatModal({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  const { t } = useTranslation()

  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [recording, setRecording] = useState(false)
  const [typing, setTyping] = useState(false)
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({})

  const recognitionRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  if (!open) return null

  /* ================= RESET CONVERSATION ================= */
  const resetConversation = async () => {
    setMessages([])
    setExpandedIds({})
    setText('')

    // Optional backend reset signal (your prompt already handles this)
    try {
      const token = localStorage.getItem('mediro-token')
      if (!token) return

      await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message: '__RESET__' })
      })
    } catch (_) {}
  }

  /* ================= SEND MESSAGE ================= */
  const sendText = async () => {
    if (!text.trim()) return

    const token = localStorage.getItem('mediro-token')
    if (!token) {
      alert('You are not logged in')
      return
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      from: 'user',
      text,
      ts: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setText('')
    setTyping(true)

    try {
      let res: Response

      if (imageFile) {
        const form = new FormData()
        form.append('message', userMessage.text)
        form.append('image', imageFile)

        res = await fetch('http://localhost:5000/chat', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: form
        })
      } else {
        res = await fetch('http://localhost:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ message: userMessage.text })
        })
      }

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      const botMessage: Message = {
        id: crypto.randomUUID(),
        from: 'bot',
        text: data.reply,
        ts: Date.now()
      }

      setMessages(prev => [...prev, botMessage])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          from: 'bot',
          text: '⚠️ Something went wrong. Please try again.',
          ts: Date.now()
        }
      ])
    } finally {
      setTyping(false)
      setImageFile(null)
    }
  }

  const toggleExpanded = (id: string) =>
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }))

  const formatText = (text: string, expanded: boolean) =>
    expanded || text.length <= 600
      ? text
      : text.slice(0, 600) + '…'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-mediro to-teal-600 px-6 py-4 text-white flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Medical Consultation</h2>
            <p className="text-xs opacity-80">AI-powered health assistant</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetConversation}
              title="Reset conversation"
              className="hover:opacity-80"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-slate-50 dark:bg-slate-800">
          {messages.map(m => {
            const isBot = m.from === 'bot'
            const expanded = !!expandedIds[m.id]

            return (
              <div key={m.id} className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[75%] rounded-xl px-4 py-3 text-sm shadow-sm
                  ${isBot
                    ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white'
                    : 'bg-mediro text-white'}
                `}>
                  <div className="whitespace-pre-wrap">
                    {formatText(m.text, expanded)}
                  </div>

                  {isBot && (
                    <div className="flex justify-between items-center mt-3 text-xs opacity-70">
                      <div className="flex gap-3">
                        <ThumbsUp className="w-4 h-4 cursor-pointer hover:text-green-500" />
                        <ThumbsDown className="w-4 h-4 cursor-pointer hover:text-red-500" />
                      </div>

                      {m.text.length > 600 && (
                        <button
                          onClick={() => toggleExpanded(m.id)}
                          className="hover:underline"
                        >
                          {expanded ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {/* Typing animation */}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-700 px-4 py-2 rounded-xl flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce [animation-delay:0.15s]">●</span>
                <span className="animate-bounce [animation-delay:0.3s]">●</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t dark:border-slate-700 px-4 py-3 flex items-center gap-2 bg-white dark:bg-slate-900">
          <button onClick={() => fileInputRef.current?.click()}>
            <ImageIcon className="w-5 h-5 text-slate-500" />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={e => setImageFile(e.target.files?.[0] || null)}
          />

          <button onClick={() => setRecording(!recording)}>
            <Mic className={`w-5 h-5 ${recording ? 'text-red-500' : 'text-slate-500'}`} />
          </button>

          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendText()}
            placeholder="Describe your symptoms…"
            className="flex-1 px-4 py-2 rounded-xl border dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm"
          />

          <button
            onClick={sendText}
            className="bg-mediro text-white p-2 rounded-xl"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
