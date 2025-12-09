import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Message = { id: string; from: 'user' | 'bot'; text?: string; img?: string; ts: number }

export default function ChatModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const [imgPreview, setImgPreview] = useState<string | null>(null)
  const [recording, setRecording] = useState(false)
  const [typing, setTyping] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const messagesEnd = useRef<HTMLDivElement | null>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [open, messages])

  const sendText = async () => {
    if (!text.trim() && !imgPreview) return
    const userMsg: Message = { id: String(Date.now()), from: 'user', text: text || (imgPreview ? '[image]' : ''), img: imgPreview || undefined, ts: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setText('')
    setImgPreview(null)
    setTyping(true)

    // Placeholder bot response - replace with API call
    setTimeout(() => {
      const bot: Message = { id: String(Date.now() + 1), from: 'bot', text: "Thanks — here's a safe insight. " + (userMsg.text ? userMsg.text.slice(0, 120) : ''), ts: Date.now() }
      setMessages(prev => [...prev, bot])
      setTyping(false)
    }, 1200)
  }

  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => setImgPreview(String(reader.result))
    reader.readAsDataURL(f)
  }

  const startVoice = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (!SpeechRecognition) {
      alert('Voice not supported in this browser.')
      return
    }
    const r = new SpeechRecognition()
    r.lang = 'en-US'
    r.interimResults = false
    r.onresult = (ev: any) => {
      const text = ev.results[0][0].transcript
      setText(prev => (prev ? prev + ' ' + text : text))
    }
    r.onerror = () => setRecording(false)
    r.onend = () => setRecording(false)
    recognitionRef.current = r
    r.start()
    setRecording(true)
  }

  const stopVoice = () => {
    recognitionRef.current?.stop()
    setRecording(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md animate-fadeIn" onClick={onClose} />
      <div className="relative glass backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden animate-scaleIn">
        {/* Header with gradient and glow */}
        <div className="relative bg-gradient-to-r from-mediro via-teal-500 to-teal-600 p-4 sm:p-6 text-white overflow-hidden">
          {/* Animated background particles */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl sm:text-2xl animate-pulse shadow-lg">
                  🤖
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold animate-fadeInUp">{t('chat.title')}</h2>
                  <p className="text-xs sm:text-sm text-white/80 mt-0.5 sm:mt-1 animate-fadeInUp" style={{animationDelay: '0.1s'}}>{t('chat.subtitle')}</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="group text-white hover:bg-white/20 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-300 text-lg sm:text-xl flex-shrink-0 hover:rotate-90 hover:scale-110"
            >
              <span className="transform group-hover:scale-125 transition-transform">✕</span>
            </button>
          </div>
        </div>

        {/* Safety Notice with pulse animation */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-3 sm:px-6 py-2 sm:py-3 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <p className="text-[10px] sm:text-xs text-amber-800 dark:text-amber-200 flex items-center gap-1 sm:gap-2">
            <span className="animate-pulse">⚠️</span>
            <span>{t('safetyNotice')}</span>
          </p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a9b8e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
          
          {/* Decorative animated blurs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-mediro/5 rounded-full blur-3xl pointer-events-none animate-float"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none animate-float" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-mediro/3 to-teal-500/3 rounded-full blur-3xl pointer-events-none animate-pulse" style={{animationDuration: '4s'}}></div>
          
          {/* Content */}
          <div className="relative z-10">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 animate-fadeInUp">
              <div className="text-6xl mb-4 animate-bounce" style={{animationDuration: '2s'}}>💬</div>
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
                {t('chat.emptyTitle')}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                {t('chat.emptySubtitle')}
              </p>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 mt-4 sm:mt-6 max-w-md w-full">
                {[
                  { icon: '📝', key: 'feature1', delay: '0.3s' },
                  { icon: '📷', key: 'feature2', delay: '0.4s' },
                  { icon: '🎤', key: 'feature3', delay: '0.5s' },
                  { icon: '⚡', key: 'feature4', delay: '0.6s' }
                ].map(({ icon, key, delay }) => (
                  <div key={key} className="group glass backdrop-blur-sm bg-white/80 dark:bg-slate-700/80 p-2.5 sm:p-3 rounded-xl shadow-sm hover:shadow-lg hover:shadow-mediro/20 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:scale-105 animate-fadeInUp" style={{animationDelay: delay}}>
                    <span className="text-xl sm:text-2xl mb-1 sm:mb-2 block transform group-hover:scale-125 transition-transform">{icon}</span>
                    <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300">{t(`chat.${key}`)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((m, idx) => (
                <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`} style={{animationDelay: `${idx * 0.1}s`}}>
                  <div className={`flex items-end gap-2 max-w-[75%] group hover:scale-[1.02] transition-transform duration-200`}>
                    {m.from === 'bot' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-mediro to-teal-600 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 shadow-lg animate-pulse">
                        🤖
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ${
                        m.from === 'user'
                          ? 'bg-gradient-to-br from-mediro to-teal-600 text-white rounded-br-sm hover:shadow-mediro/30'
                          : 'glass backdrop-blur-sm bg-white/90 dark:bg-slate-700/90 text-slate-900 dark:text-slate-100 rounded-bl-sm border border-slate-200/50 dark:border-slate-600/50'
                      }`}
                    >
                      {m.img && <img src={m.img} alt="upload" className="max-w-xs rounded-lg mb-2 hover:scale-105 transition-transform duration-300 cursor-pointer" />}
                      <p className="text-sm leading-relaxed">{m.text}</p>
                      <p className={`text-xs mt-1 ${m.from === 'user' ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'}`}>
                        {new Date(m.ts).toLocaleTimeString()}
                      </p>
                    </div>
                    {m.from === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded-full flex items-center justify-center text-sm flex-shrink-0 shadow-lg">
                        👤
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start animate-fadeInUp">
                  <div className="flex items-end gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-mediro to-teal-600 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 shadow-lg animate-pulse">
                      🤖
                    </div>
                    <div className="glass backdrop-blur-sm bg-white/90 dark:bg-slate-700/90 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-slate-200/50 dark:border-slate-600/50">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-mediro rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-mediro rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                        <span className="w-2 h-2 bg-mediro rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          </div>
          <div ref={messagesEnd} />
        </div>

        {/* Input Area with glassmorphism */}
        <div className="glass backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-t border-slate-200/50 dark:border-slate-700/50 p-4">
          {imgPreview && (
            <div className="flex items-center gap-3 glass backdrop-blur-sm bg-slate-100/80 dark:bg-slate-800/80 p-3 rounded-xl mb-3 shadow-sm border border-slate-200/50 dark:border-slate-700/50 animate-fadeInUp">
              <img src={imgPreview} alt="preview" className="w-20 h-20 object-cover rounded-xl shadow-md hover:scale-110 transition-transform cursor-pointer" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('chat.imageAttached')}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('chat.imageReady')}</p>
              </div>
              <button
                onClick={() => setImgPreview(null)}
                className="text-red-500 hover:text-red-700 px-3 py-1 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-110 font-bold"
              >
                ✕
              </button>
            </div>
          )}
          <div className="flex items-center gap-2">
            {/* Image upload button */}
            <button
              onClick={() => fileRef.current?.click()}
              className="group relative p-3 glass backdrop-blur-sm hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-xl transition-all duration-300 text-xl hover:scale-110 border border-slate-200/50 dark:border-slate-700/50 hover:border-mediro dark:hover:border-mediro overflow-hidden"
              title={t('chat.uploadImage')}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-mediro/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 transform group-hover:scale-110 transition-transform">📷</span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onSelectImage}
            />
            
            {/* Voice button */}
            <button
              onMouseDown={startVoice}
              onMouseUp={stopVoice}
              onTouchStart={startVoice}
              onTouchEnd={stopVoice}
              className={`group relative p-3 rounded-xl transition-all duration-300 text-xl hover:scale-110 border overflow-hidden ${
                recording 
                  ? 'bg-red-500 text-white border-red-600 animate-pulse shadow-lg shadow-red-500/30' 
                  : 'glass backdrop-blur-sm hover:bg-slate-100/80 dark:hover:bg-slate-800/80 border-slate-200/50 dark:border-slate-700/50 hover:border-mediro dark:hover:border-mediro'
              }`}
              title={recording ? t('chat.recordingStop') : t('chat.recordingStart')}
            >
              {!recording && <span className="absolute inset-0 bg-gradient-to-r from-mediro/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>}
              <span className="relative z-10 transform group-hover:scale-110 transition-transform">
                {recording ? '🔴' : '🎤'}
              </span>
            </button>
            
            {/* Text input */}
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={t('chat.placeholder')}
              className="flex-1 px-4 py-3 glass backdrop-blur-sm border border-slate-300/50 dark:border-slate-600/50 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition-all duration-300 hover:shadow-lg focus:shadow-xl"
              onKeyPress={e => e.key === 'Enter' && sendText()}
            />
            
            {/* Send button */}
            <button
              onClick={sendText}
              className="group relative px-6 py-3 bg-gradient-to-r from-mediro to-teal-600 text-white rounded-xl hover:shadow-xl hover:shadow-mediro/40 transition-all duration-300 font-semibold overflow-hidden transform hover:scale-105 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-mediro opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2">
                {t('chat.send')} 
                <span className="transform group-hover:translate-x-1 transition-transform">➤</span>
              </span>
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
