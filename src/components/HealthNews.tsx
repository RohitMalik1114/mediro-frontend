import { useTranslation } from 'react-i18next'

type NewsArticle = {
  title: string
  description: string
  date: string
  source: string
  url: string
  category: string
}

export default function HealthNews() {
  const { t } = useTranslation()
  const articles = t('healthNews.articles', { returnObjects: true }) as NewsArticle[]

  return (
    <section id="news" className="py-16 bg-slate-50 dark:bg-[#071119]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-4">
            {t('healthNews.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('healthNews.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <a
              key={idx}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:border-orange-400 dark:hover:border-orange-500 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 block"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-mediro bg-mediro/10 px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {article.date}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-mediro transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {article.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  📰 {article.source}
                </span>
                <span className="text-mediro text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Read more →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
