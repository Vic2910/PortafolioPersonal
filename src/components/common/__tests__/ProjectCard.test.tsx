import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProjectCard } from '../ProjectCard'

const mockProject = {
  id: '1',
  name: 'Test Project',
  slug: 'test-project',
  description: 'Test description',
  shortDesc: 'Short desc',
  technologies: ['React', 'TypeScript'],
  imageUrl: '/test.jpg',
  featured: true,
  orderIndex: 1,
}

describe('ProjectCard', () => {
  it('renders project name', () => {
    render(<ProjectCard project={mockProject} onClick={() => {}} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('renders short description', () => {
    render(<ProjectCard project={mockProject} onClick={() => {}} />)
    expect(screen.getByText('Short desc')).toBeInTheDocument()
  })

  it('renders technologies', () => {
    render(<ProjectCard project={mockProject} onClick={() => {}} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('shows featured badge when featured is true', () => {
    render(<ProjectCard project={mockProject} onClick={() => {}} />)
    expect(screen.getByText('Destacado')).toBeInTheDocument()
  })
})
