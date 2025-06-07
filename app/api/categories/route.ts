import { NextResponse } from 'next/server'

// Mock categories data
const mockCategories = [
  {
    id: 'cat1',
    fields: {
      'Category Name': 'Acting Coaches',
      'Description': 'Professional acting coaches and instructors for young performers'
    }
  },
  {
    id: 'cat2',
    fields: {
      'Category Name': 'Photographers',
      'Description': 'Headshot and portfolio photographers specializing in child actors'
    }
  },
  {
    id: 'cat3',
    fields: {
      'Category Name': 'Music Lessons',
      'Description': 'Voice and instrument lessons for young performers'
    }
  },
  {
    id: 'cat4',
    fields: {
      'Category Name': 'Art Classes',
      'Description': 'Creative arts and visual arts instruction'
    }
  },
  {
    id: 'cat5',
    fields: {
      'Category Name': 'Talent Agencies',
      'Description': 'Representation for child actors and performers'
    }
  },
  {
    id: 'cat6',
    fields: {
      'Category Name': 'Educational Services',
      'Description': 'Tutoring and educational support for young performers'
    }
  }
]

export async function GET() {
  try {
    return NextResponse.json(mockCategories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}