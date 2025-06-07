'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ListingCard from '@/components/ListingCard'
import DirectoryFilters from '@/components/DirectoryFilters'

interface Listing {
  id: string
  fields: {
    'Business Name': string
    Description?: string
    Location?: string
    Category?: string[]
    Logo?: Array<{ url: string }>
    Featured?: boolean
    '101 Approved'?: boolean
    Virtual?: boolean
    'Age Range'?: string[]
  }
}

export default function DirectoryPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    virtual: false,
    ageRange: [] as string[],
    search: ''
  })

  const searchParams = useSearchParams()

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }))
    }
    fetchListings()
  }, [searchParams])

  useEffect(() => {
    applyFilters()
  }, [listings, filters])

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/listings')
      const data = await response.json()
      setListings(data)
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...listings]

    if (filters.search) {
      filtered = filtered.filter(listing =>
        listing.fields['Business Name'].toLowerCase().includes(filters.search.toLowerCase()) ||
        (listing.fields.Description && listing.fields.Description.toLowerCase().includes(filters.search.toLowerCase()))
      )
    }

    if (filters.category) {
      filtered = filtered.filter(listing =>
        listing.fields.Category && listing.fields.Category.includes(filters.category)
      )
    }

    if (filters.location) {
      filtered = filtered.filter(listing =>
        listing.fields.Location && listing.fields.Location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.virtual) {
      filtered = filtered.filter(listing => listing.fields.Virtual)
    }

    if (filters.ageRange.length > 0) {
      filtered = filtered.filter(listing =>
        listing.fields['Age Range'] && 
        filters.ageRange.some(age => listing.fields['Age Range']?.includes(age))
      )
    }

    setFilteredListings(filtered)
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Directory</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Directory</h1>
          <p className="text-lg text-gray-600">
            Find trusted professionals for young performers
          </p>
        </div>

        <DirectoryFilters 
          filters={filters} 
          onFilterChange={handleFilterChange}
        />

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredListings.length} of {listings.length} services
          </p>
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No services found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}