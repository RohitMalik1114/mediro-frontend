import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

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
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  if (!open) return null

  /* ================= SEND MESSAGE ================= */
  const sendText = async () => {
    if (!text.trim()) return

    const token = localStorage.getItem('mediro-token')
    if (!token) {
      alert('You are not logged in')
      return
    }

    const userMessage: Message = {
      id: String(Date.now()),
      from: 'user',
      text,
      ts: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setText('')
    setTyping(true)

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message: userMessage.text })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Chat failed')
      }

      const botMessage: Message = {
        id: String(Date.now() + 1),
        from: 'bot',
        text: data.reply,
        ts: Date.now()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: String(Date.now() + 2),
          from: 'bot',
          text: '⚠️ Sorry, something went wrong. Please try again.',
          ts: Date.now()
        }
      ])
    } finally {
      setTyping(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-mediro to-teal-600 p-5 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{t('chat.title')}</h2>
            <p className="text-xs opacity-80">{t('chat.subtitle')}</p>
          </div>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-800">
          {messages.length === 0 && (
            <p className="text-center text-slate-400 mt-10">
              Ask anything about your health 👩‍⚕️
            </p>
          )}

          {messages.map(m => (
            <div
              key={m.id}
              className={`flex ${
                m.from === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-xl text-sm ${
                  m.from === 'user'
                    ? 'bg-mediro text-white'
                    : 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white'
                }`}
              >
                {m.text}
                <div className="text-[10px] opacity-60 mt-1 text-right">
                  {new Date(m.ts).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-700 px-4 py-3 rounded-xl text-sm">
                Typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t dark:border-slate-700 flex gap-2">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendText()}
            placeholder={t('chat.placeholder')}
            className="flex-1 px-4 py-3 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-800"
          />
          <button
            onClick={sendText}
            className="px-6 py-3 bg-mediro text-white rounded-xl font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
