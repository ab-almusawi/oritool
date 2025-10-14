import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2 } from 'lucide-react'
import { api } from '@/services/api'
import { useTranslation } from 'react-i18next'

export function ContactPage() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await api.sendMessage(formData)
      setSubmitted(true)
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' })
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      setError(t('contact.errorMessage'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-600/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text animate-gradient">
              {t('contact.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 stagger-fade-in">
            <Card className="glass-card hover-lift group border-2 hover:border-primary/50 transition-all duration-500">
              <CardHeader className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl">{t('contact.emailUs')}</CardTitle>
                <CardDescription className="text-base">{t('contact.emailDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <a href="mailto:support@oritool.com" className="text-primary hover:text-accent transition-colors duration-300 block font-medium">
                    support@oritool.com
                  </a>
                  <a href="mailto:info@oritool.com" className="text-primary hover:text-accent transition-colors duration-300 block font-medium">
                    info@oritool.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift group border-2 hover:border-primary/50 transition-all duration-500">
              <CardHeader className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl">{t('contact.callUs')}</CardTitle>
                <CardDescription className="text-base">{t('contact.callDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="tel:+380933111222" className="text-primary hover:text-accent transition-colors duration-300 font-medium text-lg">
                  +380 93 311 1222
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift group border-2 hover:border-primary/50 transition-all duration-500">
              <CardHeader className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl">{t('contact.visitUs')}</CardTitle>
                <CardDescription className="text-base">{t('contact.visitDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Mikola Amasova Street<br />
                  Building 32A<br />
                  Vinnitsia, Ukraine
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-2 animate-scale-in glow-strong">
            <CardHeader className="space-y-4">
              <CardTitle className="text-3xl md:text-4xl">{t('contact.sendMessage')}</CardTitle>
              <CardDescription className="text-lg">
                {t('contact.sendMessageDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-16 animate-scale-in">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                    <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-10 w-10 text-white animate-scale-in" />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">{t('contact.messageSent')}</h3>
                  <p className="text-lg text-muted-foreground">
                    {t('contact.thankYou')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive animate-scale-in">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t('contact.nameLabel')}</label>
                      <input
                        type="text"
                        placeholder={t('contact.namePlaceholder')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 border-2 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t('contact.emailLabel')}</label>
                      <input
                        type="email"
                        placeholder={t('contact.emailPlaceholder')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 border-2 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t('contact.subjectLabel')}</label>
                    <input
                      type="text"
                      placeholder={t('contact.subjectPlaceholder')}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t('contact.messageLabel')}</label>
                    <textarea
                      placeholder={t('contact.messagePlaceholder')}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2 text-lg px-8 py-6 gradient-primary hover:shadow-2xl hover:scale-105 transition-all duration-300 glow" disabled={loading}>
                    <Send className="h-5 w-5" />
                    {loading ? t('contact.sending') : t('contact.sendButton')}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
