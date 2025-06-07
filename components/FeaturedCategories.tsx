'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Camera, Music, Palette, Users, Star, BookOpen } from 'lucide-react'

interface Category {
  id: string
  fields: {
    'Category Name': string
    Description?: string
  }
}

const iconMap: { [key: string]: any } = {
  'Acting Coaches': Users,
  'Photographers': Camera,
  'Music Lessons': Music,
  'Art Classes': Palette,
  'Talent Agencies': Star,
  'Educational Services': BookOpen,
}

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.slice(0, 6)) // Show first 6 categories
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <p className="text-xl text-gray-600">
            Find the perfect services for your young performer
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.fields['Category Name']] || Users
            
            return (
              <Link
                key={category.id}
                href={`/directory?category=${encodeURIComponent(category.fields['Category Name'])}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow card-hover"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <IconComponent className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.fields['Category Name']}
                  </h3>
                </div>
                {category.fields.Description && (
                  <p className="text-gray-600 text-sm">
                    {category.fields.Description}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
        
        <div className="text-center mt-8">
          <Link
            href="/directory"
            className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  )
}