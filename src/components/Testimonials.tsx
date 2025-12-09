import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Review = { rating: number; text: string; author: string; age: string; role: string; location: string }

export default function Testimonials() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const reviews = t('testimonials.reviews', { returnObjects: true }) as Review[]
  const stats = t('testimonials.stats', { returnObjects: true }) as Record<string, string>

  const nextReview = () => setCurrentIndex((prev) => (prev + 1) % reviews.length)
  const prevReview = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)

  const currentReview = reviews[currentIndex]

  return (
    <section id="testimonials" className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-lg p-8 shadow-lg">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-lg">⭐</span>
              ))}
            </div>

            {/* Review Text */}
            <p className="text-slate-700 dark:text-slate-200 text-lg mb-6 italic leading-relaxed">
              "{currentReview.text}"
            </p>

            {/* Author Info */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {currentReview.author}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {currentReview.age} • {currentReview.role}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    📍 {currentReview.location}
                  </p>
                </div>
                <div className="text-4xl">👤</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevReview}
              className="p-2 rounded-full bg-mediro text-white hover:bg-opacity-90 transition"
              aria-label="Previous review"
            >
              ←
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex
                      ? 'bg-mediro w-8'
                      : 'bg-slate-300 dark:bg-slate-600 w-2'
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-2 rounded-full bg-mediro text-white hover:bg-opacity-90 transition"
              aria-label="Next review"
            >
              →
            </button>
          </div>
        </div>

        {/* Stats Section */}
        {stats && Object.keys(stats).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {Object.values(stats).map((stat, idx) => {
              const parts = typeof stat === 'string' ? stat.match(/(.+?)\s*\+\s*(.+)/) : null
              if (!parts) return null
              return (
                <div key={idx} className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="text-3xl font-bold text-mediro mb-2">
                    {parts[1]}+
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    {parts[2]}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
