import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Shield, Code, Cloud, Database, Cpu, Lock, Users, Zap, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function ServicesPage() {
  const { t } = useTranslation()
  const services = [
    {
      icon: Code,
      title: t('services.softwareDev'),
      description: t('services.softwareDevDesc'),
      features: [
        t('services.webApps'),
        t('services.mobileApps'),
        t('services.enterpriseSoftware'),
        t('services.apiDevelopment')
      ],
    },
    {
      icon: Shield,
      title: t('services.cybersecurity'),
      description: t('services.cybersecurityDesc'),
      features: [
        t('services.securityAudits'),
        t('services.pentesting'),
        t('services.complianceManagement'),
        t('services.monitoring247')
      ],
    },
    {
      icon: Cloud,
      title: t('services.cloud'),
      description: t('services.cloudDesc'),
      features: [
        t('services.cloudMigration'),
        t('services.infraManagement'),
        t('services.cloudOptimization'),
        t('services.multicloud')
      ],
    },
    {
      icon: Database,
      title: t('services.dataAnalytics'),
      description: t('services.dataAnalyticsDesc'),
      features: [
        t('services.dataWarehousing'),
        t('services.businessIntelligence'),
        t('services.predictiveAnalytics'),
        t('services.dataVisualization')
      ],
    },
    {
      icon: Cpu,
      title: t('services.aiMl'),
      description: t('services.aiMlDesc'),
      features: [
        t('services.mlModel'),
        t('services.nlp'),
        t('services.computerVision'),
        t('services.intelligentAutomation')
      ],
    },
    {
      icon: Lock,
      title: t('services.securityConsulting'),
      description: t('services.securityConsultingDesc'),
      features: [
        t('services.riskAssessment'),
        t('services.securityStrategy'),
        t('services.complianceConsulting'),
        t('services.trainingAwareness')
      ],
    },
    {
      icon: Users,
      title: t('services.itConsulting'),
      description: t('services.itConsultingDesc'),
      features: [
        t('services.techStrategy'),
        t('services.digitalTransformation'),
        t('services.systemArchitecture'),
        t('services.itRoadmap')
      ],
    },
    {
      icon: Zap,
      title: t('services.devops'),
      description: t('services.devopsDesc'),
      features: [
        t('services.cicdPipeline'),
        t('services.infrastructureAsCode'),
        t('services.containerOrchestration'),
        t('services.monitoringLogging')
      ],
    },
  ]

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text animate-gradient">
              {t('services.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-fade-in">
            {services.map((service, index) => (
              <Card 
                key={service.title} 
                className="glass-card hover-lift group border-2 hover:border-primary/50 transition-all duration-500"
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
                
                <CardContent>
                  <ul className="grid grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm flex items-start gap-2 group/item">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                        <span className="flex-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="glass-card rounded-3xl p-10 md:p-16 text-center space-y-8 particle-bg animate-scale-in glow-strong">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text animate-gradient">
              {t('services.readyToStart')}
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('services.readySubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link to="/contact">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 gradient-primary hover:shadow-2xl hover:scale-105 transition-all duration-300 glow">
                  <Sparkles className="h-5 w-5" />
                  {t('services.contactUs')}
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass hover:shadow-xl hover:scale-105 transition-all duration-300">
                  {t('services.viewProducts')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
