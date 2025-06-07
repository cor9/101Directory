'use client'

import { useEffect, useState } from 'react'
import { Search, Filter, X } from 'lucide-react'

interface Category {
  id: string
  fields: {
    'Category Name': string
  }
}

interface FiltersProps {
  filters: {
    category: string
    location: string
    virtual: boolean
    ageRange: string[]
    search: string
  }
  onFilterChange: (filters: any) => void
}

const ageRanges = [
  '0-5 years',
  '6-10 years',
  '11-15 years',
  '16-18 years',
  '18+ years'
]

export default function DirectoryFilters({ filters, onFilterChange }: FiltersProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value })
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, category: e.target.value })
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, location: e.target.value })
  }

  const handleVirtualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, virtual: e.target.checked })
  }

  const handleAgeRangeChange = (ageRange: string) => {
    const newAgeRange = filters.ageRange.includes(ageRange)
      ? filters.ageRange.filter(age => age !== ageRange)
      : [...filters.ageRange, ageRange]
    onFilterChange({ ...filters, ageRange: newAgeRange })
  }

  const clearFilters = () => {
    onFilterChange({
      category: '',
      location: '',
      virtual: false,
      ageRange: [],
      search: ''
    })
  }

  const hasActiveFilters = filters.category || filters.location || filters.virtual || filters.ageRange.length > 0

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search services..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
        >
          <Filter className="w-5 h-5" />
          Filters
          {hasActiveFilters && (
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors text-sm"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.fields['Category Name']}>
                  {category.fields['Category Name']}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter city or state"
              value={filters.location}
              onChange={handleLocationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Virtual Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Type
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.virtual}
                onChange={handleVirtualChange}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">Virtual services only</span>
            </label>
          </div>

          {/* Age Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Range
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {ageRanges.map((ageRange) => (
                <label key={ageRange} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.ageRange.includes(ageRange)}
                    onChange={() => handleAgeRangeChange(ageRange)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{ageRange}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}