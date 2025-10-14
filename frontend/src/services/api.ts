const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? '/api' 
    : 'http://localhost:3000')

export interface Product {
  id: string
  name: string
  description: string
  imageUrl?: string
  productUrl?: string
  category: string
  status: 'active' | 'inactive'
  features?: string[]
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface AuthResponse {
  access_token: string
  user: User
}

export interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  isRead: boolean
  createdAt: string
}

export interface CreateMessageDto {
  name: string
  email: string
  subject: string
  message: string
}

export interface CreateProductDto {
  name: string
  description: string
  imageUrl?: string
  productUrl?: string
  category: string
  status?: 'active' | 'inactive'
  features?: string[]
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token')
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) throw new Error('Invalid credentials')
    const data = await response.json()
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
    if (!response.ok) throw new Error('Registration failed')
    const data = await response.json()
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data
  }

  logout(): void {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
  }

  getUser(): User | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token')
  }

  isAdmin(): boolean {
    const user = this.getUser()
    return user?.role === 'admin'
  }

  async getAllProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`)
    if (!response.ok) throw new Error('Failed to fetch products')
    return response.json()
  }

  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}`)
    if (!response.ok) throw new Error('Failed to fetch product')
    return response.json()
  }

  async uploadImage(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData()
    formData.append('image', file)
    
    const response = await fetch(`${API_URL}/products/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: formData,
    })
    if (!response.ok) throw new Error('Failed to upload image')
    return response.json()
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    console.log('Creating product with data:', data)
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
      console.error('Create product failed:', response.status, errorData)
      throw new Error(errorData.message || 'Failed to create product')
    }
    return response.json()
  }

  async updateProduct(id: string, data: UpdateProductDto): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
      console.error('Update product failed:', response.status, errorData)
      throw new Error(errorData.message || 'Failed to update product')
    }
    return response.json()
  }

  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Failed to delete product')
  }

  async sendMessage(data: CreateMessageDto): Promise<Message> {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to send message')
    return response.json()
  }

  async getAllMessages(): Promise<Message[]> {
    const response = await fetch(`${API_URL}/messages`, {
      headers: this.getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Failed to fetch messages')
    return response.json()
  }

  async getUnreadCount(): Promise<number> {
    const response = await fetch(`${API_URL}/messages/unread-count`, {
      headers: this.getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Failed to fetch unread count')
    return response.json()
  }

  async markMessageAsRead(id: string): Promise<Message> {
    const response = await fetch(`${API_URL}/messages/${id}/read`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Failed to mark message as read')
    return response.json()
  }

  async deleteMessage(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Failed to delete message')
  }
}

export const api = new ApiService()
