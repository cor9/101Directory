'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, CheckCircle } from 'lucide-react'

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
  }
}

export default function FeaturedListings() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedListings()
  }, [])

  const fetchFeaturedListings = async () => {
    try {
      const response = await fetch('/api/listings?featured=true&limit=6')
      const data = await response.json()
      setListings(data)
    } catch (error) {
      console.error('Error fetching featured listings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
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
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Services</h2>
          <p className="text-xl text-gray-600">
            Handpicked professionals trusted by the Child Actor 101 community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listing/${listing.id}`}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow card-hover"
            >
              <div className="relative h-48 bg-gray-100">
                {listing.fields.Logo && listing.fields.Logo[0] ? (
                  <Image
                    src={listing.fields.Logo[0].url}
                    alt={listing.fields['Business Name']}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary-100 to-primary-200">
                    <span className="text-2xl font-bold text-primary-600">
                      {listing.fields['Business Name'].charAt(0)}
                    </span>
                  </div>
                )}
                
                <div className="absolute top-2 right-2 flex gap-1">
                  {listing.fields.Featured && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </span>
                  )}
                  {listing.fields['101 Approved'] && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      101 Approved
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {listing.fields['Business Name']}
                </h3>
                
                {listing.fields.Description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {listing.fields.Description.substring(0, 120)}...
                  </p>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  {listing.fields.Location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {listing.fields.Location}
                    </div>
                  )}
                  
                  {listing.fields.Virtual && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      Virtual Available
                    </span>
                  )}
                </div>
                
                {listing.fields.Category && listing.fields.Category.length > 0 && (
                  <div className="mt-3">
                    <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                      {listing.fields.Category[0]}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/directory"
            className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
          >
            View All Listings
          </Link>
        </div>
      </div>
    </section>
  )
}