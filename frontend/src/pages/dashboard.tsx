import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Pencil, Trash2, Package, LogOut, ExternalLink, Inbox } from 'lucide-react'
import { api } from '@/services/api'
import type { Product, CreateProductDto } from '@/services/api'

export function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState<CreateProductDto>({
    name: '',
    description: '',
    imageUrl: '',
    productUrl: '',
    category: 'Cybersecurity',
    status: 'active',
    features: [],
  })

  const [featureInput, setFeatureInput] = useState('')

  useEffect(() => {
    loadProducts()
    loadUnreadCount()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await api.getAllProducts()
      setProducts(data)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadUnreadCount = async () => {
    try {
      const count = await api.getUnreadCount()
      setUnreadCount(count)
    } catch (error) {
      console.error('Failed to load unread count:', error)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setUploading(true)
    try {
      let imageUrl = formData.imageUrl

      // Upload image if selected
      if (selectedImage) {
        console.log('Uploading image:', selectedImage.name, selectedImage.type)
        try {
          const uploadResult = await api.uploadImage(selectedImage)
          console.log('Upload successful:', uploadResult)
          imageUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${uploadResult.url}`
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError)
          alert(`Failed to upload image: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`)
          return
        }
      }

      const productData = { ...formData, imageUrl }
      console.log('Saving product with data:', productData)

      if (editingProduct) {
        console.log('Updating product:', editingProduct.id)
        await api.updateProduct(editingProduct.id, productData)
      } else {
        console.log('Creating new product')
        await api.createProduct(productData)
      }
      
      console.log('Product saved successfully!')
      await loadProducts()
      resetForm()
    } catch (error) {
      console.error('Failed to save product:', error)
      alert(`Failed to save product: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      await api.deleteProduct(id)
      await loadProducts()
    } catch (error) {
      alert('Failed to delete product')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl || '',
      productUrl: product.productUrl || '',
      category: product.category,
      status: product.status as 'active' | 'inactive',
      features: product.features || [],
    })
    setImagePreview(product.imageUrl || '')
    setSelectedImage(null)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      imageUrl: '',
      productUrl: '',
      category: 'Cybersecurity',
      status: 'active',
      features: [],
    })
    setFeatureInput('')
    setSelectedImage(null)
    setImagePreview('')
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), featureInput.trim()],
      })
      setFeatureInput('')
    }
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index),
    })
  }

  const handleLogout = () => {
    api.logout()
    navigate('/login')
  }

  const user = api.getUser()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center particle-bg">
        <div className="text-center animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-xl animate-pulse-glow" />
            <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent" />
          </div>
          <p className="text-lg text-muted-foreground mt-6 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text animate-gradient mb-3">Admin Dashboard</h1>
              <p className="text-lg text-muted-foreground">
                Welcome back, <span className="font-semibold text-primary">{user?.name}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 relative glass hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={() => navigate('/inbox')}
              >
                <Inbox className="h-5 w-5" />
                Inbox
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-br from-destructive to-red-600 text-white text-xs flex items-center justify-center font-bold animate-pulse-glow">
                    {unreadCount}
                  </span>
                )}
              </Button>
              <Button
                size="lg"
                className="gap-2 gradient-primary hover:shadow-xl hover:scale-105 transition-all duration-300 glow"
                onClick={() => {
                  resetForm()
                  setShowForm(!showForm)
                }}
              >
                <Plus className="h-5 w-5" />
                Add Product
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 glass hover:shadow-xl hover:scale-105 transition-all duration-300" 
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>

          {showForm && (
            <Card className="glass-card border-2 animate-scale-in glow">
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl md:text-3xl gradient-text">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </CardTitle>
                <CardDescription className="text-base">
                  Fill in the details to {editingProduct ? 'update' : 'add'} a product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Product Name *</label>
                      <input
                        type="text"
                        placeholder="e.g., SecureGuard Pro"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 border-2 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 border-2 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none"
                      >
                        <option>Cybersecurity</option>
                        <option>Software Development</option>
                        <option>Cloud Solutions</option>
                        <option>Data Analytics</option>
                        <option>AI & Machine Learning</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Description *</label>
                    <textarea
                      placeholder="Detailed product description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border-2 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="w-full px-3 py-2 border rounded-md bg-background file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <div className="h-32 w-32 rounded-md border overflow-hidden bg-muted">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Image will be optimized and converted to WebP format
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Product URL</label>
                    <input
                      type="url"
                      placeholder="https://product-link.com"
                      value={formData.productUrl}
                      onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as 'active' | 'inactive',
                        })
                      }
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Features</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a feature"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                        className="flex-1 px-3 py-2 border rounded-md bg-background"
                      />
                      <Button type="button" variant="outline" onClick={addFeature}>
                        Add
                      </Button>
                    </div>
                    {formData.features && formData.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm"
                          >
                            {feature}
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="text-destructive hover:text-destructive/80"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="submit" 
                      disabled={uploading}
                      className="gradient-primary hover:shadow-xl hover:scale-105 transition-all duration-300 glow"
                    >
                      {uploading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          Uploading...
                        </div>
                      ) : (
                        editingProduct ? 'Update Product' : 'Save Product'
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={resetForm} 
                      disabled={uploading}
                      className="glass hover:shadow-xl transition-all duration-300"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 gap-6">
            <Card className="glass-card border-2 animate-fade-in">
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl md:text-3xl">Products ({products.length})</CardTitle>
                <CardDescription className="text-base">Manage all your software products</CardDescription>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <div className="text-center py-16 animate-scale-in">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-2xl opacity-50" />
                      <div className="relative h-24 w-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                        <Package className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <p className="text-xl text-muted-foreground font-medium">No products yet. Create your first one!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-start justify-between p-6 border-2 rounded-2xl hover:border-primary/50 hover:shadow-xl transition-all duration-300 glass group"
                      >
                        <div className="flex gap-4 flex-1">
                          {product.imageUrl ? (
                            <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted">
                              <img
                                src={product.imageUrl.replace('_optimized.webp', '_thumb.webp')}
                                alt={product.name}
                                loading="lazy"
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  if (!target.src.includes('_optimized.webp')) {
                                    target.src = product.imageUrl || ''
                                  }
                                }}
                              />
                            </div>
                          ) : (
                            <div className="h-20 w-20 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Package className="h-8 w-8 text-primary" />
                            </div>
                          )}
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{product.name}</h3>
                              {product.productUrl && (
                                <a
                                  href={product.productUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:text-primary/80"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex flex-wrap gap-3 text-sm pt-1">
                              <span className="text-muted-foreground">{product.category}</span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs ${
                                  product.status === 'active'
                                    ? 'bg-green-500/10 text-green-500'
                                    : 'bg-muted text-muted-foreground'
                                }`}
                              >
                                {product.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
