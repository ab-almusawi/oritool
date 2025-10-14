import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Target, Eye, Award, Users, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function AboutPage() {
  const { t } = useTranslation()
  
  const values = [
    {
      icon: Target,
      title: t('about.innovationFirst'),
      description: t('about.innovationDesc'),
    },
    {
      icon: Award,
      title: t('about.excellence'),
      description: t('about.excellenceDesc'),
    },
    {
      icon: Users,
      title: t('about.clientSuccess'),
      description: t('about.clientSuccessDesc'),
    },
    {
      icon: Eye,
      title: t('about.transparency'),
      description: t('about.transparencyDesc'),
    },
  ]

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text animate-gradient">
              {t('about.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground glass-card p-8 md:p-10 rounded-3xl border-2 animate-fade-in">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
              {t('about.paragraph1')}
            </p>
            <p>
              {t('about.paragraph2')}
            </p>
            <p>
              {t('about.paragraph3')}
            </p>
          </div>

          <div className="space-y-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-center gradient-text">{t('about.ourValues')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-fade-in">
              {values.map((value, index) => (
                <Card 
                  key={value.title} 
                  className="glass-card hover-lift group border-2 hover:border-primary/50 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                      <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center animate-scale-in">
            <div className="glass-card rounded-3xl p-8 hover-lift border-2">
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-4">10+</div>
              <p className="text-lg text-muted-foreground font-medium">{t('about.yearsExperience')}</p>
            </div>
            <div className="glass-card rounded-3xl p-8 hover-lift border-2">
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-4">200+</div>
              <p className="text-lg text-muted-foreground font-medium">{t('about.projectsDelivered')}</p>
            </div>
            <div className="glass-card rounded-3xl p-8 hover-lift border-2">
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-4">50+</div>
              <p className="text-lg text-muted-foreground font-medium">{t('about.happyClients')}</p>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-10 md:p-16 text-center space-y-8 particle-bg animate-scale-in glow-strong">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text animate-gradient">
              {t('about.joinUs')}
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('about.joinUsDesc')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link to="/contact">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 gradient-primary hover:shadow-2xl hover:scale-105 transition-all duration-300 glow">
                  <Sparkles className="h-5 w-5" />
                  {t('about.getInTouch')}
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass hover:shadow-xl hover:scale-105 transition-all duration-300">
                  {t('about.ourServices')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
