import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, MailOpen, Trash2, ArrowLeft, Clock, Sparkles } from 'lucide-react'
import { api } from '@/services/api'
import type { Message } from '@/services/api'

export function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      const data = await api.getAllMessages()
      setMessages(data)
    } catch (error) {
      console.error('Failed to load messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMessageClick = async (message: Message) => {
    setSelectedMessage(message)
    if (!message.isRead) {
      try {
        await api.markMessageAsRead(message.id)
        setMessages(messages.map(m => 
          m.id === message.id ? { ...m, isRead: true } : m
        ))
      } catch (error) {
        console.error('Failed to mark as read:', error)
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    try {
      await api.deleteMessage(id)
      setMessages(messages.filter(m => m.id !== id))
      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    } catch (error) {
      alert('Failed to delete message')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const unreadCount = messages.filter(m => !m.isRead).length

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center particle-bg">
        <div className="text-center animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-xl animate-pulse-glow" />
            <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent" />
          </div>
          <p className="text-lg text-muted-foreground mt-6 font-medium">Loading messages...</p>
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
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text animate-gradient mb-3">Inbox</h1>
              <p className="text-lg text-muted-foreground">
                <span className="font-semibold text-primary">{unreadCount}</span> unread message{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="glass hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-scale-in">
            <Card className="lg:col-span-1 glass-card border-2">
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl">Messages ({messages.length})</CardTitle>
                <CardDescription className="text-base">Click a message to view details</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {messages.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-2xl opacity-50" />
                      <div className="relative h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                        <Mail className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <p className="text-lg text-muted-foreground font-medium">No messages yet</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => handleMessageClick(message)}
                        className={`p-5 cursor-pointer hover:bg-primary/5 transition-all duration-300 ${
                          selectedMessage?.id === message.id ? 'bg-primary/10 border-l-4 border-primary' : ''
                        } ${!message.isRead ? 'bg-accent/5' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              {message.isRead ? (
                                <MailOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              ) : (
                                <Mail className="h-4 w-4 text-primary flex-shrink-0 animate-pulse" />
                              )}
                              <p className="font-semibold text-sm truncate">
                                {message.name}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground truncate mb-2 font-medium">
                              {message.subject}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatDate(message.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 glass-card border-2">
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl">Message Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedMessage ? (
                  <div className="space-y-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <h3 className="text-2xl font-bold">{selectedMessage.subject}</h3>
                        <div className="flex items-center gap-2 text-base text-muted-foreground">
                          <span className="font-semibold">{selectedMessage.name}</span>
                          <span>•</span>
                          <a 
                            href={`mailto:${selectedMessage.email}`} 
                            className="text-primary hover:text-accent transition-colors duration-300 font-medium"
                          >
                            {selectedMessage.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {formatDate(selectedMessage.createdAt)}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="glass hover:bg-destructive hover:text-white transition-all duration-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="border-t-2 pt-8">
                      <p className="whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground">
                        {selectedMessage.message}
                      </p>
                    </div>

                    <div className="border-t-2 pt-8 flex gap-3">
                      <Button 
                        asChild
                        className="gradient-primary hover:shadow-xl hover:scale-105 transition-all duration-300 glow"
                      >
                        <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Reply via Email
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-2xl opacity-50 animate-pulse" />
                      <div className="relative h-24 w-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                        <Mail className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <p className="text-xl text-muted-foreground font-medium">Select a message to view details</p>
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
