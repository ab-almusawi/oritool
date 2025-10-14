import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'
import { LanguageToggle } from './language-toggle'
import { Code2, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 w-full glass border-b backdrop-blur-2xl animate-fade-in">
      <nav className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Code2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="font-bold text-2xl gradient-text animate-gradient">
              Oritool
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-base font-medium hover:text-primary transition-all duration-300 hover:scale-105 relative group"
          >
            {t('nav.home')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link 
            to="/services" 
            className="text-base font-medium hover:text-primary transition-all duration-300 hover:scale-105 relative group"
          >
            {t('nav.services')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link 
            to="/products" 
            className="text-base font-medium hover:text-primary transition-all duration-300 hover:scale-105 relative group"
          >
            {t('nav.products')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link 
            to="/about" 
            className="text-base font-medium hover:text-primary transition-all duration-300 hover:scale-105 relative group"
          >
            {t('nav.about')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link 
            to="/contact" 
            className="text-base font-medium hover:text-primary transition-all duration-300 hover:scale-105 relative group"
          >
            {t('nav.contact')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl hover:bg-primary/10 transition-all duration-300"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-300" />
            )}
          </Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t glass backdrop-blur-2xl animate-slide-in-right">
          <div className="container mx-auto py-6 px-6 flex flex-col gap-4 stagger-fade-in">
            <Link
              to="/"
              className="text-base font-medium hover:text-primary transition-all duration-300 py-2 px-4 rounded-xl hover:bg-primary/10 hover:scale-105 transform"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/services"
              className="text-base font-medium hover:text-primary transition-all duration-300 py-2 px-4 rounded-xl hover:bg-primary/10 hover:scale-105 transform"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.services')}
            </Link>
            <Link
              to="/products"
              className="text-base font-medium hover:text-primary transition-all duration-300 py-2 px-4 rounded-xl hover:bg-primary/10 hover:scale-105 transform"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.products')}
            </Link>
            <Link
              to="/about"
              className="text-base font-medium hover:text-primary transition-all duration-300 py-2 px-4 rounded-xl hover:bg-primary/10 hover:scale-105 transform"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/contact"
              className="text-base font-medium hover:text-primary transition-all duration-300 py-2 px-4 rounded-xl hover:bg-primary/10 hover:scale-105 transform"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
