import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ProfileSidebar({ open, onClose }: { open: boolean, onClose: () => void }) {
  const { t } = useTranslation()
  const [profile, setProfile] = useState(() => {
    const p = localStorage.getItem('mediro-profile')
    return p ? JSON.parse(p) : { 
      name: '', 
      age: '', 
      gender: '', 
      email: '',
      phone: '',
      bloodType: '',
      height: '',
      weight: '',
      country: '',
      countryCode: '+1',
      state: '',
      conditions: '', 
      allergies: '',
      medications: '',
      emergencyContact: ''
    }
  })

  // Country codes mapping
  const countries = [
    { name: 'United States', code: '+1' },
    { name: 'India', code: '+91' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Canada', code: '+1' },
    { name: 'Australia', code: '+61' },
    { name: 'Germany', code: '+49' },
    { name: 'France', code: '+33' },
    { name: 'Italy', code: '+39' },
    { name: 'Spain', code: '+34' },
    { name: 'Mexico', code: '+52' },
    { name: 'Brazil', code: '+55' },
    { name: 'Argentina', code: '+54' },
    { name: 'China', code: '+86' },
    { name: 'Japan', code: '+81' },
    { name: 'South Korea', code: '+82' },
    { name: 'Russia', code: '+7' },
    { name: 'South Africa', code: '+27' },
    { name: 'Nigeria', code: '+234' },
    { name: 'Egypt', code: '+20' },
    { name: 'Saudi Arabia', code: '+966' },
    { name: 'UAE', code: '+971' },
    { name: 'Pakistan', code: '+92' },
    { name: 'Bangladesh', code: '+880' },
    { name: 'Indonesia', code: '+62' },
    { name: 'Thailand', code: '+66' },
    { name: 'Vietnam', code: '+84' },
    { name: 'Philippines', code: '+63' },
    { name: 'Malaysia', code: '+60' },
    { name: 'Singapore', code: '+65' },
    { name: 'New Zealand', code: '+64' }
  ]

  const handleCountryChange = (country: string) => {
    const selectedCountry = countries.find(c => c.name === country)
    setProfile({ 
      ...profile, 
      country, 
      countryCode: selectedCountry?.code || '+1' 
    })
  }

  const save = () => {
    localStorage.setItem('mediro-profile', JSON.stringify(profile))
    alert(t('profile.saved'))
  }

  const deleteProfile = () => {
    if (window.confirm(t('profile.confirmDelete'))) {
      localStorage.removeItem('mediro-profile')
      setProfile({ 
        name: '', 
        age: '', 
        gender: '', 
        email: '',
        phone: '',
        bloodType: '',
        height: '',
        weight: '',
        country: '',
        countryCode: '+1',
        state: '',
        conditions: '', 
        allergies: '',
        medications: '',
        emergencyContact: ''
      })
      alert(t('profile.deleted'))
    }
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-full sm:w-96 bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-mediro to-teal-600 p-4 sm:p-6 text-white z-10">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">{t('profile.title')}</h3>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5 sm:mt-1">{t('profile.subtitle')}</p>
            </div>
            <button 
              onClick={onClose} 
              className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Profile Icon */}
        <div className="flex justify-center -mt-12 mb-6">
          <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-5xl shadow-lg border-4 border-white dark:border-slate-900">
            👤
          </div>
        </div>

        {/* Form */}
        <div className="px-4 sm:px-6 pb-6 space-y-4">
          {/* Personal Information Section */}
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <span>👤</span> {t('profile.personalInfo')}
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('profile.name')}
                </label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition" 
                  placeholder={t('profile.namePlaceholder')}
                  value={profile.name} 
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t('profile.age')}
                  </label>
                  <input 
                    type="number"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition" 
                    placeholder={t('profile.agePlaceholder')}
                    value={profile.age} 
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t('profile.gender')}
                  </label>
                  <select 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-mediro focus:border-transparent transition"
                    value={profile.gender} 
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  >
                    <option value="">{t('profile.genderPlaceholder')}</option>
                    <option value="male">{t('profile.male')}</option>
                    <option value="female">{t('profile.female')}</option>
                    <option value="other">{t('profile.other')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('profile.email')}
                </label>
                <input 
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition" 
                  placeholder={t('profile.emailPlaceholder')}
                  value={profile.email} 
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('profile.phone')}
                </label>
                <div className="flex gap-2">
                  <div className="w-24">
                    <input 
                      type="text"
                      readOnly
                      value={profile.countryCode}
                      className="w-full px-3 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white text-center font-semibold"
                    />
                  </div>
                  <input 
                    type="tel"
                    className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition" 
                    placeholder={t('profile.phonePlaceholder')}
                    value={profile.phone} 
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <span>📍</span> {t('profile.location')}
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('profile.country')}
                </label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-mediro focus:border-transparent transition"
                  value={profile.country} 
                  onChange={(e) => handleCountryChange(e.target.value)}
                >
                  <option value="">{t('profile.countryPlaceholder')}</option>
                  {countries.map(country => (
                    <option key={country.name} value={country.name}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('profile.state')}
                </label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition" 
                  placeholder={t('profile.statePlaceholder')}
                  value={profile.state} 
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Health Information Section */}
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <span>🏥</span> {t('profile.healthInfo')}
            </h4>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t('profile.bloodType')}
                  </label>
                  <select 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-mediro focus:border-transparent transition"
                    value={profile.bloodType} 
                    onChange={(e) => setProfile({ ...profile, bloodType: e.target.value })}
                  >
                    <option value="">{t('profile.bloodTypePlaceholder')}</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t('profile.height')}
                  </label>
                  <input 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition" 
                    placeholder={t('profile.heightPlaceholder')}
                    value={profile.height} 
                    onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t('profile.weight')}
                  </label>
                  <input 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition" 
                    placeholder={t('profile.weightPlaceholder')}
                    value={profile.weight} 
                    onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('profile.conditions')}
                </label>
                <textarea 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition resize-none" 
                  placeholder={t('profile.conditionsPlaceholder')}
                  rows={2}
                  value={profile.conditions} 
                  onChange={(e) => setProfile({ ...profile, conditions: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('profile.allergies')}
                </label>
                <textarea 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition resize-none" 
                  placeholder={t('profile.allergiesPlaceholder')}
                  rows={2}
                  value={profile.allergies} 
                  onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('profile.medications')}
                </label>
                <textarea 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition resize-none" 
                  placeholder={t('profile.medicationsPlaceholder')}
                  rows={2}
                  value={profile.medications} 
                  onChange={(e) => setProfile({ ...profile, medications: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="pb-4">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <span>🚨</span> {t('profile.emergency')}
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('profile.emergencyContact')}
              </label>
              <input 
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition" 
                placeholder={t('profile.emergencyContactPlaceholder')}
                value={profile.emergencyContact} 
                onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              className="flex-1 bg-mediro text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5" 
              onClick={save}
            >
              💾 {t('profile.save')}
            </button>
            <button 
              className="px-6 py-3 rounded-lg border-2 border-red-500 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition" 
              onClick={deleteProfile}
            >
              🗑️
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t('profile.securityTitle')}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t('profile.securityNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
    </div>
  )
}
