import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, Shield, Cloud, Database, Cpu, ExternalLink, Sparkles } from 'lucide-react'
import { api } from '@/services/api'
import type { Product } from '@/services/api'
import { useTranslation } from 'react-i18next'

export function ProductsPage() {
  const { t } = useTranslation()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await api.getAllProducts()
      setProducts(data.filter(p => p.status === 'active'))
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIconForCategory = (category: string) => {
    const icons: Record<string, typeof Shield> = {
      'Cybersecurity': Shield,
      'Cloud Solutions': Cloud,
      'Data Analytics': Database,
      'AI & Machine Learning': Cpu,
      'Software Development': Package,
    }
    return icons[category] || Package
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center particle-bg">
        <div className="text-center animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-xl animate-pulse-glow" />
            <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent" />
          </div>
          <p className="text-lg text-muted-foreground mt-6 font-medium">{t('products.loading')}</p>
        </div>
      </div>
    )
  }

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
              {t('products.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('products.subtitle')}
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24 animate-scale-in">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-2xl opacity-50" />
                <div className="relative h-24 w-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                  <Package className="h-12 w-12 text-white" />
                </div>
              </div>
              <p className="text-xl text-muted-foreground font-medium">{t('products.noProducts')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-fade-in">
              {products.map((product, index) => {
                const IconComponent = getIconForCategory(product.category)
                return (
                  <Card 
                    key={product.id} 
                    className="glass-card flex flex-col hover-lift group border-2 hover:border-primary/50 transition-all duration-500 overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="space-y-4">
                      {product.imageUrl ? (
                        <div className="w-full h-48 mb-4 overflow-hidden rounded-xl bg-muted relative">
                          <img
                            src={product.imageUrl.replace('_optimized.webp', '_thumb.webp')}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              if (!target.src.includes('_optimized.webp')) {
                                target.src = product.imageUrl || ''
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 mb-4 rounded-xl bg-gradient-to-br from-primary via-accent to-purple-600 flex items-center justify-center relative overflow-hidden">
                          <IconComponent className="h-20 w-20 text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                        </div>
                      )}
                      
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300 flex-1">
                          {product.name}
                        </CardTitle>
                        {product.productUrl && (
                          <a
                            href={product.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 h-10 w-10 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                      
                      <CardDescription className="text-base leading-relaxed">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-1">
                      {product.features && product.features.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            {t('products.keyFeatures')}
                          </p>
                          <ul className="space-y-2">
                            {product.features.map((feature, index) => (
                              <li key={index} className="text-sm flex items-start gap-3 group/item">
                                <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                                <span className="flex-1">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                    
                    <CardFooter className="pt-6">
                      {product.productUrl ? (
                        <Button asChild className="w-full gradient-primary hover:shadow-xl hover:scale-105 transition-all duration-300">
                          <a href={product.productUrl} target="_blank" rel="noopener noreferrer">
                            {t('products.learnMore')}
                          </a>
                        </Button>
                      ) : (
                        <Button className="w-full gradient-primary hover:shadow-xl hover:scale-105 transition-all duration-300">
                          {t('products.learnMore')}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          )}

          <div className="text-center space-y-8 pt-12 animate-fade-in">
            <div className="max-w-3xl mx-auto glass-card rounded-3xl p-10 md:p-12 particle-bg glow">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text animate-gradient">
                {t('products.needCustom')}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {t('products.needCustomDesc')}
              </p>
              <Link to="/contact">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 gradient-primary hover:shadow-2xl hover:scale-105 transition-all duration-300 glow">
                  <Sparkles className="h-5 w-5" />
                  {t('products.contactSales')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
