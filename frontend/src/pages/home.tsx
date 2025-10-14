import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Shield, Code, Cpu, Database, Cloud, Lock, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function HomePage() {
  const { t } = useTranslation()
  const services = [
    {
      icon: Code,
      title: t('home.services.softwareDev'),
      description: t('home.services.softwareDevDesc'),
    },
    {
      icon: Shield,
      title: t('home.services.cybersecurity'),
      description: t('home.services.cybersecurityDesc'),
    },
    {
      icon: Cloud,
      title: t('home.services.cloud'),
      description: t('home.services.cloudDesc'),
    },
    {
      icon: Database,
      title: t('home.services.dataAnalytics'),
      description: t('home.services.dataAnalyticsDesc'),
    },
    {
      icon: Cpu,
      title: t('home.services.aiMl'),
      description: t('home.services.aiMlDesc'),
    },
    {
      icon: Lock,
      title: t('home.services.securityAudits'),
      description: t('home.services.securityAuditsDesc'),
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative py-24 md:py-40 overflow-hidden particle-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-purple-600/20 dark:from-primary/10 dark:via-accent/10 dark:to-purple-600/10 animate-gradient" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight gradient-text animate-gradient">
              {t('home.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('home.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/products">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 gradient-primary hover:shadow-2xl hover:scale-105 transition-all duration-300 glow">
                  {t('home.viewProducts')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass hover:shadow-xl hover:scale-105 transition-all duration-300">
                  {t('home.getInTouch')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/50 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">{t('home.ourServices')}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('home.servicesSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-fade-in">
            {services.map((service, index) => (
              <Card 
                key={service.title} 
                className="glass-card hover-lift group cursor-pointer border-2 hover:border-primary/50 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                    <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto glass-card rounded-3xl p-10 md:p-16 text-center space-y-8 particle-bg animate-scale-in glow-strong">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text animate-gradient">
              {t('home.readyToTransform')}
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('home.transformSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link to="/contact">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 gradient-primary hover:shadow-2xl hover:scale-105 transition-all duration-300 glow">
                  <Sparkles className="h-5 w-5" />
                  {t('home.startProject')}
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass hover:shadow-xl hover:scale-105 transition-all duration-300">
                  {t('home.learnMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
