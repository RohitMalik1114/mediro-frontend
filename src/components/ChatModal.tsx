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
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [recording, setRecording] = useState(false)
  const recognitionRef = useRef<any>(null)
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({})

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
      let res: Response

      if (imageFile) {
        const form = new FormData()
        form.append('message', userMessage.text)
        form.append('image', imageFile)

        res = await fetch('http://localhost:5000/chat', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
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
      setImageFile(null)
    }
  }

  /* ================= IMAGE PICKER ================= */
  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    if (f) setImageFile(f)
  }

  /* ================= VOICE RECORDING (browser) ================= */
  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setText(prev => (prev ? prev + ' ' + transcript : transcript))
    }

    recognition.onerror = (e: any) => {
      console.error('Speech error', e)
      setRecording(false)
    }

    recognition.onend = () => setRecording(false)

    recognition.start()
    recognitionRef.current = recognition
    setRecording(true)
  }

  const stopRecording = () => {
    const r = recognitionRef.current
    if (r) r.stop()
    setRecording(false)
  }

  /* ================= Message helpers ================= */
  const toggleExpanded = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (_) {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
  }

  const formatToHtml = (raw: string) => {
    if (!raw) return ''
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const lines = esc(raw).split(/\n/) || []
    let out = ''
    let inList = false
    for (let ln of lines) {
      ln = ln.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      if (/^\s*\*\s+/.test(ln)) {
        if (!inList) { out += '<ul class="ml-4 list-disc">'; inList = true }
        out += `<li>${ln.replace(/^\s*\*\s+/, '')}</li>`
      } else {
        if (inList) { out += '</ul>'; inList = false }
        if (/^#{1,3}\s+/.test(ln)) {
          const level = ln.match(/^#{1,3}/)![0].length
          const tag = level === 1 ? 'h3' : level === 2 ? 'h4' : 'h5'
          out += `<${tag} class="font-semibold mt-2">${ln.replace(/^#{1,3}\s+/, '')}</${tag}>`
        } else if (/^\s*-\s+/.test(ln)) {
          out += `<p class="mt-1">• ${ln.replace(/^\s*-\s+/, '')}</p>`
        } else {
          out += `<p class="mt-1">${ln}</p>`
        }
      }
    }
    if (inList) out += '</ul>'
    return out
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

          {messages.map(m => {
            const isBot = m.from === 'bot'
            const formatted = isBot ? formatToHtml(m.text) : ''
            const isExpanded = !!expandedIds[m.id]
            const short = m.text.length > 600 && !isExpanded

            return (
              <div key={m.id} className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
                {isBot && (
                  <div className="mr-3 flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-mediro font-semibold">B</div>
                  </div>
                )}

                <div className={`max-w-[75%] px-4 py-3 rounded-xl text-sm break-words ${isBot ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white' : 'bg-mediro text-white'}`}>
                  {isBot ? (
                    <div>
                      <div className="prose dark:prose-invert text-sm" dangerouslySetInnerHTML={{ __html: short ? formatToHtml(m.text.slice(0, 600) + '...') : formatted }} />
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-[10px] opacity-60">{new Date(m.ts).toLocaleTimeString()}</div>
                        <div className="flex items-center gap-2">
                          {m.text.length > 600 && (
                            <button onClick={() => toggleExpanded(m.id)} className="text-xs text-slate-500 hover:underline">
                              {isExpanded ? 'Show less' : 'Show more'}
                            </button>
                          )}
                          <button onClick={() => copyToClipboard(m.text)} className="text-xs text-slate-500 hover:text-slate-700">Copy</button>
                        </div>
                      </div>
                      {isExpanded && m.text && (
                        <div className="mt-2 prose dark:prose-invert text-sm" dangerouslySetInnerHTML={{ __html: formatToHtml(m.text) }} />
                      )}
                    </div>
                  ) : (
                    <>
                      <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
                      <div className="text-[10px] opacity-60 mt-1 text-right">{new Date(m.ts).toLocaleTimeString()}</div>
                    </>
                  )}
                </div>

                {!isBot && (
                  <div className="ml-3 flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-mediro flex items-center justify-center text-white font-semibold">U</div>
                  </div>
                )}
              </div>
            )
          })}

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
          <label className="flex items-center gap-2">
            <input type="file" accept="image/*" onChange={onPickImage} className="hidden" />
            <button
              onClick={() => document.querySelector('input[type=file]')?.click()}
              className="px-3 py-2 bg-slate-100 rounded-md"
            >
              📷
            </button>
            {imageFile && <span className="text-xs">{imageFile.name}</span>}
          </label>
          <button
            onClick={() => (recording ? stopRecording() : startRecording())}
            className={`px-3 py-2 rounded-md ${recording ? 'bg-red-500 text-white' : 'bg-slate-100'}`}
          >
            {recording ? 'Stop' : '🎤'}
          </button>
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
