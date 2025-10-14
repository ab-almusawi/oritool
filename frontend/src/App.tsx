import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Header } from '@/components/custom/header'
import { ProtectedRoute } from '@/components/custom/protected-route'
import { HomePage } from '@/pages/home'
import { DashboardPage } from '@/pages/dashboard'
import { ProductsPage } from '@/pages/products'
import { LoginPage } from '@/pages/login'
import { ServicesPage } from '@/pages/services'
import { AboutPage } from '@/pages/about'
import { ContactPage } from '@/pages/contact'
import { InboxPage } from '@/pages/inbox'

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const hideHeaderFooter = ['/login', '/dashboard'].includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeaderFooter && <Header />}
      <main className="flex-1">{children}</main>
      {!hideHeaderFooter && (
        <footer className="border-t glass mt-auto backdrop-blur-2xl">
          <div className="container mx-auto px-4 py-10 text-center">
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-base text-muted-foreground font-medium">
                &copy; {new Date().getFullYear()} <span className="gradient-text font-bold">Oritool</span>. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground">
                Building the future with cutting-edge technology solutions
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute adminOnly>
                <InboxPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
