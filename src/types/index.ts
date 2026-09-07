export interface Project {
  id: string
  name: string
  slug: string
  description: string
  shortDesc: string
  technologies: string[]
  imageUrl: string
  repoUrl?: string
  demoUrl?: string
  featured: boolean
  orderIndex: number
}

export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'tools'
  level: 'beginner' | 'intermediate' | 'advanced'
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
  read: boolean
}
